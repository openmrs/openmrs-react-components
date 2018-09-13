import { call, put, takeEvery } from 'redux-saga/effects';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest';

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?

function parse(value, formId) {

  let path = value[0].split('|')[1].split('=')[1];
  let concept = value[0].split('|')[2].split('=')[1];
  let val = value[1];

  // TODO update to use form field and namespace instead of comment when running OpenMRS 1.11+
  return {
    concept: concept,
    value: val,
    comment: formId + "^" + path
  };
}

function* submit(action) {

  // TODO double submits, correct form, state, etc

  try {

    let encounter = {
      // TODO: handle encounter date if submitted
      patient: action.patient.uuid,
      encounterType: action.encounterType.uuid,
      visit: action.visit ? action.visit.uuid : null
    };

    let obs = [];

    if (action.values) {
      Object.entries(action.values).forEach((value) => {
        obs.push(parse(value, action.formId));
      });
    }

    encounter.obs = obs;
    yield call(encounterRest.createEncounter, { encounter: encounter });
  }
  catch (e) {
    yield put(formActions.formSubmitFailed());
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
