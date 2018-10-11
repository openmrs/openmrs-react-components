import { call, put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest';
import obsRest from '../../rest/obsRest';
import { FORM_STATES } from "./constants";

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?

function getPathFromFieldName(fieldName) {
  return fieldName.split('|')[1].split('=')[1];
}

function getConceptFromFieldName(fieldName) {
  return fieldName.split('|')[2].split('=')[1];
}

function findExistingObsUuid(formId, path, encounter) {

  if (!encounter || !encounter.obs) {
    return null;
  }
  else {
    // TODO update to use form field and namespace instead of comment when running OpenMRS 1.11+
    const existingObs = encounter.obs.filter(o => o.comment === formId + "^" + path);
    return existingObs && existingObs.length > 0 ? existingObs[0].uuid : undefined;
  }

}

function createObs(value, formId, encounter) {

  // TODO update to use form field and namespace instead of comment when running OpenMRS 1.11+
  let path = getPathFromFieldName(value[0]);
  let concept = getConceptFromFieldName(value[0]);
  let val = value[1];
  let existingObsUuid = findExistingObsUuid(formId, path, encounter);

  let obs = {
    concept: concept,
    value: val,
    comment: formId + "^" + path
  };

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
    }

    // TODO do we want to handle the time component at some point
    // set the encounter datetime, if specified, but ignore the time component
    if (action.values['encounter-datetime']) {
      encounter.encounterDatetime = moment(action.values['encounter-datetime']).startOf('day').format();
    }

    // create the obs to add to the encounter
    let obs = [];

    if (action.values) {
      Object.entries(action.values)
        .filter(value => value[0].startsWith('obs'))
        .filter(value => value[1])  // filter out any ones with no value
        .forEach((value) => {
          obs.push(createObs(value, action.formId, action.encounter));
        });
    }

    encounter.obs = obs;

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
      .map(value => ({ uuid: findExistingObsUuid(action.formId, getPathFromFieldName(value[0]), action.encounter ) }))  // match to any existing obs
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
