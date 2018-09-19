import { call, put, takeEvery } from 'redux-saga/effects';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest';

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?

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
  let path = value[0].split('|')[1].split('=')[1];
  let concept = value[0].split('|')[2].split('=')[1];
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

    // if this is *not* a new encounter we need to add patient, encounterType and visit so it can be created
    if (!action.encounter) {
      encounter = {
        // TODO: handle encounter date if submitted
        patient: action.patient.uuid,
        encounterType: action.encounterType.uuid,
        visit: action.visit ? action.visit.uuid : null
      };
    }
    // otherwise, include the existing encounter uuid
    else {
      encounter = {
        uuid: action.encounter.uuid
      }
    }

    let obs = [];

    if (action.values) {
      Object.entries(action.values)
        .filter(v => v[1])  // filter out any ones with no value
        .forEach((value) => {
          obs.push(createObs(value, action.formId, action.encounter));
        });
    }

    encounter.obs = obs;

    if (!action.encounter) {
      yield call(encounterRest.createEncounter, { encounter: encounter });
    }
    else {
      yield call(encounterRest.updateEncounter, { encounter: encounter });
    }

  }
  catch (e) {
    yield put(formActions.formSubmitFailed(e));
    return;
  }

  yield put(formActions.formSubmitSucceeded(action.formSubmittedActionCreator));

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


function *openmrsFormSagas() {
  // TODO take latest or take every? create a "take first"?
  yield takeEvery(FORM_TYPES.SUBMIT, submit);
  yield takeEvery(FORM_TYPES.SUBMIT_SUCCEEDED, submitSucceeded);
}

export default openmrsFormSagas;
