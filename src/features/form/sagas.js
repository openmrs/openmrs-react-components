import { call, put, takeEvery } from 'redux-saga/effects';
import { format, parse, isSameDay, isToday } from 'date-fns';
import FORM_TYPES from './types';
import formActions from './actions';
import formUtil from './util';
import encounterRest from '../../rest/encounterRest';
import obsRest from '../../rest/obsRest';
import { FORM_STATES } from "./constants";
import visitRest from '../../rest/visitRest';

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?
// TODO clear out hanging obs groups?

// TODO update to use form field and namespace instead of comment when running OpenMRS 1.11+

function findExistingObsUuid(formId, path, flattenedObs) {

  if (!flattenedObs) {
    return null;
  }
  else {
    const existingObs = flattenedObs.find(o => formUtil.hasMatchingFormAndPath(o, formId, path));
    return existingObs ? existingObs.uuid : undefined;
  }

}

function addObs(allObs, value, formId, orderUuid, existingObsFlattened) {

  const { path, concepts } = formUtil.parseObsFieldName(value[0]);
  let val = value[1];

  // create the obs
  const obs = createObs(val, path, concepts[concepts.length - 1], formId, orderUuid, existingObsFlattened);

  // figure out where to add it in the tree
  addObsHelper(allObs, 0, obs, path, concepts, formId, orderUuid, existingObsFlattened);
}

// add the obs to the obs tree, creating any intermediate obs groups as necessary
function addObsHelper(obsAtLevel, currentLevel, obs, path, concepts, formId, orderUuid, existingObsFlattened) {

  // if at the lowest level, just add
  if (currentLevel + 1 == path.length) {
    obsAtLevel.push(obs);
  }
  else {
    // try to find the existing grouping at current level
    let obsGroup = obsAtLevel.find(o => o.comment === formId + "^" + path.slice(0, currentLevel + 1).join('^'));

    // if the obsGrouping concept doesn't exist, create it
    if (!obsGroup) {
      obsGroup = createObs(null, path.slice(0, currentLevel + 1), concepts[currentLevel], formId, orderUuid,existingObsFlattened);
      obsGroup.groupMembers = [];
      obsAtLevel.push(obsGroup);
    }

    // go to the next level
    addObsHelper(obsGroup.groupMembers, currentLevel + 1, obs, path, concepts, formId, orderUuid, existingObsFlattened);
  }
}

function createObs(val, path, concept, formId, orderUuid, existingObsFlattened) {

  let existingObsUuid = findExistingObsUuid(formId, path, existingObsFlattened);

  // TODO make this support the new form/namespace pattern
  let obs = {
    concept: concept,
    comment: formId + '^' + path.join('^')
  };

  if (val) {
    obs.value = val;
  }

  if (existingObsUuid) {
    obs.uuid = existingObsUuid;
  }

  if (orderUuid) {
    obs.order = orderUuid;
  }

  return obs;
}

// if new encounter: timestamp with current datetime if timestampNewEncounter flag set, other use encounter date from form
// if existing encounter: maintain time component of existing encounter datetime if date has not changed
// see: https://issues.openmrs.org/browse/RAUI-34
function determineEncounterDatetime(submittedEncounterDatetime, existingEncounter, timestampNewEncounterIfCurrentDay) {
  if (!existingEncounter) {
    if (isToday(submittedEncounterDatetime) && timestampNewEncounterIfCurrentDay) {
      return format(new Date());
    }
    else {
      return format(submittedEncounterDatetime);
    }
  }
  else {
    if (isSameDay(existingEncounter.encounterDatetime, submittedEncounterDatetime)) {
      return format(existingEncounter.encounterDatetime);
    }
    else {
      return format(submittedEncounterDatetime);
    }
  }
}

function* submit(action) {

  // TODO double submits, correct form, state, etc

  try {

    let encounter = {};
    let updatedEncounter = {};
    let existingFlattenedObs = [];
    let existingEncounter = action.encounter;

    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.SUBMITTING));

    // if this is *not* a existing encounter we need to add patient, encounterType and visit so it can be created
    if (!existingEncounter) {
      encounter = {
        // TODO: handle encounter date if submitted
        patient: action.patient.uuid,
        encounterType: action.encounterType.uuid,
        visit: action.visit ? action.visit.uuid : null
      };

      // add encounter location if specified
      if (action.location) {
        encounter.location = action.location.uuid;
      }

      // add encounterProvider if role and provider specified
      if (action.provider && action.encounterRole) {
        encounter.encounterProviders = [
          {
            "provider": action.provider.uuid,
            "encounterRole": action.encounterRole.uuid
          }
        ];
      }
    }
    // otherwise, include the existing encounter uuid
    else {
      encounter = {
        uuid: existingEncounter.uuid
      };

      // flatten the existing obs to one level (for reference)
      existingFlattenedObs = formUtil.flattenObs(existingEncounter.obs);
    }

    // handle setting or updating the date
    if (typeof action.values !== 'undefined' && action.values && action.values['encounter-datetime']) {
      encounter.encounterDatetime =
        determineEncounterDatetime(parse(action.values['encounter-datetime']), existingEncounter, action.timestampNewEncounterIfCurrentDay);
    }

    // create an array of the obs we received from the form
    const obsFromForm = Object.entries(action.values)
      .filter(value => value[0].startsWith('obs'))  // only form names that start with obs

    // create the obs to add to the encounter
    let allObs = [];
    obsFromForm
      .filter(value => value[1])  // filter out any ones with no value
      .forEach((value) => {
        addObs(allObs, value, action.formId, action.orderForObs ? action.orderForObs.uuid : null, existingFlattenedObs);
      });

    encounter.obs = allObs;

    if (action.visitType && !action.visit) {
      //create a new visit
      let newVisit = {
        patient: action.patient.uuid,
        visitType: action.visitType.uuid
      };
      if (action.location) {
        newVisit.location = action.location.uuid;
      }
      newVisit = yield call(visitRest.createVisit, { visit: newVisit });
      // we do not need to specifically set the encounter visit since the EmrApiVisitAssignmentHandler does it automatically based on the encounter and visit location
      //encounter.visit = newVisit.uuid;
    }
    if (!existingEncounter) {
      // create encounter
      updatedEncounter = yield call(encounterRest.createEncounter, encounter);
    } else {
      updatedEncounter = yield call(encounterRest.updateEncounter, encounter);
    }

    // now delete any existing obs if necessary
    // first search obsFromForm for any that are in the submitted form, but have a value set to null/0
    const obsToDelete =
      obsFromForm
        .filter(value => !value[1])  // any ones without a value
        .map(value => ({ uuid: findExistingObsUuid(action.formId, formUtil.parseObsFieldName(value[0]).path, existingFlattenedObs ) }))  // match to any existing obs
        .filter(obs => obs.uuid);  // only ones with matching uuid

    // we do this in a standard for instead of for-each because haven't figured out how to handle nested generator functions yet
    if (obsToDelete && obsToDelete.length > 0) {
      for (let i = 0; i < obsToDelete.length; i++) {
        yield call(obsRest.deleteObs, obsToDelete[i]);
      }
    }
    // we should refetch the encounter to because create and update only return minimal representations
    updatedEncounter = yield call(encounterRest.getEncounter, updatedEncounter.uuid);

    yield put(formActions.formBackingEncounterLoaded(action.formInstanceId, updatedEncounter));
    yield put(formActions.formSubmitSucceeded(action.formInstanceId, action.formSubmittedActionCreator));

    if (!action.manuallyExitSubmitMode) {
      yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.VIEWING));
    }
  }
  catch (e) {
    yield put(formActions.formSubmitFailed(action.formInstanceId));
  }

}

function* submitSucceeded(action) {
  if (action.formSubmittedActionCreator) {
    if (typeof action.formSubmittedActionCreator === "function") {
      yield put(action.formSubmittedActionCreator());
    }
    else if (Array.isArray(action.formSubmittedActionCreator)) {
      for (let i = 0; i < action.formSubmittedActionCreator.length; i++) {
        yield put(action.formSubmittedActionCreator[i]());
      }
    }
  }
}

function* loadFormBackingEncounter(action) {
  try {
    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.LOADING));
    const encounter = yield call(encounterRest.getEncounter, action.encounterUuid);
    yield put(formActions.formBackingEncounterLoaded(action.formInstanceId, encounter));
    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.VIEWING));
  }
  catch (e) {
    // TODO better error handling
    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.SYSTEM_ERROR));
  }
}


function *openmrsFormSagas() {
  // TODO take latest or take every? create a "take first"?
  yield takeEvery(FORM_TYPES.SUBMIT, submit);
  yield takeEvery(FORM_TYPES.SUBMIT_SUCCEEDED, submitSucceeded);
  yield takeEvery(FORM_TYPES.LOAD_FORM_BACKING_ENCOUNTER, loadFormBackingEncounter);
}

export default openmrsFormSagas;
