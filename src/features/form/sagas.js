import { call, put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import FORM_TYPES from './types';
import formActions from './actions';
import formUtil from './util';
import encounterRest from '../../rest/encounterRest';
import obsRest from '../../rest/obsRest';
import { FORM_STATES } from "./constants";

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?

// TODO update to use form field and namespace instead of comment when running OpenMRS 1.11+


function getPathFromFieldName(fieldName) {
  return fieldName.split('|')[1].split('=')[1].split('^');
}

function getConceptPathFromFieldName(fieldName) {
  return fieldName.split('|')[2].split('=')[1].split('^');
}

function findExistingObsUuid(formId, path, flattenedObs) {

  if (!flattenedObs) {
    return null;
  }
  else {
    const existingObs = flattenedObs.find(o => o.comment === formId + "^" + path.join('^'));
    return existingObs ? existingObs.uuid : undefined;
  }

}

function addObs(allObs, value, formId, existingObsFlattened) {

  let path = getPathFromFieldName(value[0]);
  let conceptPath = getConceptPathFromFieldName(value[0]);
  let val = value[1];

  // create the obs
  const obs = createObs(val, path, conceptPath[conceptPath.length - 1], formId, existingObsFlattened);

  // figure out where to add it in the tree
  addObsHelper(allObs, 0, obs, path, conceptPath, formId, existingObsFlattened);
}

// add the obs to the obs tree, creating any intermediate obs groups as necessary
function addObsHelper(obsAtLevel, currentLevel, obs, path, concepts, formId, existingObsFlattened) {

  // if at the lowest level, just add
  if (currentLevel + 1 == path.length) {
    obsAtLevel.push(obs);
  }
  else {
    // try to find the existing grouping at current level
    let obsGroup = obsAtLevel.find(o => o.comment === formId + "^" + path.slice(0, currentLevel + 1).join('^'));

    // if the obsGrouping concept doesn't exist, create it
    if (!obsGroup) {
      obsGroup = createObs(null, path.slice(0, currentLevel + 1), concepts[currentLevel], formId, existingObsFlattened);
      obsGroup.groupMembers = [];
      obsAtLevel.push(obsGroup);
    }

    // go to the next level
    addObsHelper(obsGroup.groupMembers, currentLevel + 1, obs, path, concepts, formId, existingObsFlattened);
  }
}

function createObs(val, path, concept, formId, existingObsFlattened) {

  let existingObsUuid = findExistingObsUuid(formId, path, existingObsFlattened);

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

  return obs;
}


function* submit(action) {

  // TODO double submits, correct form, state, etc

  try {

    let encounter = {};
    let updatedEncounter = {};
    let existingFlattenedObs = [];

    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.SUBMITTING));

    // if this is *not* a new encounter we need to add patient, encounterType and visit so it can be created
    if (!action.encounter) {
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
        uuid: action.encounter.uuid
      };

      // flatten the existing obs to one level (for reference)
      existingFlattenedObs = formUtil.flattenObs(action.encounter.obs);
    }

    if (action.values['encounter-datetime']) {
      encounter.encounterDatetime = moment(action.values['encounter-datetime']).format();
    }

    // create the obs to add to the encounter
    let allObs = [];

    if (action.values) {
      Object.entries(action.values)
        .filter(value => value[0].startsWith('obs'))
        .filter(value => value[1])  // filter out any ones with no value
        .forEach((value) => {
          addObs(allObs, value, action.formId, existingFlattenedObs);
        });
    }

    encounter.obs = allObs;

    // create encounter
    if (!action.encounter) {
      updatedEncounter = yield call(encounterRest.createEncounter, encounter);
    }
    else {
      updatedEncounter = yield call(encounterRest.updateEncounter, encounter);
    }

    // now delete any existing obs if necessary
    let obsToDelete = Object.entries(action.values)
      .filter(value => !value[1])  // any ones without a value
      .map(value => ({ uuid: findExistingObsUuid(action.formId, getPathFromFieldName(value[0]), existingFlattenedObs ) }))  // match to any existing obs
      .filter(obs => obs.uuid); // only ones with matching uuid

    // we do this in a standard for instead of for-each because haven't figured out how to handle nested generator functions yet
    if (obsToDelete && obsToDelete.length > 0) {
      for (let i = 0; i < obsToDelete.length; i++) {
        yield call(obsRest.deleteObs, obsToDelete[i]);
      }
      // we have to refetch the encounter if we've deleted any obs
      updatedEncounter = yield call(encounterRest.getEncounter, updatedEncounter.uuid);
    }

    yield put(formActions.formBackingEncounterLoaded(action.formInstanceId, updatedEncounter));
    yield put(formActions.formSubmitSucceeded(action.formInstanceId, action.formSubmittedActionCreator));
    yield put(formActions.setFormState(action.formInstanceId, FORM_STATES.VIEWING));
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
