import { call, put, takeEvery } from 'redux-saga/effects';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest';

// TODO need to handle fields that aren't obs!
// TODO this should really pass back something... the id of the created encounter, etc?
// TODO set form namespace? how to we match existing values in forms? update data, etc?


function* submit(action) {

  // TODO double submits, correct form, state, etc

  try {

    let encounter = {
      // TODO: handle encounter date if submitted
      patient: action.patient.uuid,
      encounterType: action.encounterType.uuid,
      visit: action.visit ? action.visit.uuid : null,
      location: (action.visit && action.visit.location) ? action.visit.location.uuid : null
    };

    let obs = [];

    if (action.values && action.values.observations) {
      action.values.observations.forEach((o) => {
        obs.push({
          concept: o.concept.uuid,
          value: o.value
        });
      });
    }

    encounter.obs = obs;
    yield call(encounterRest.createEncounter, { encounter: encounter });
  }
  catch (e) {
    yield put(formActions.formSubmitFailed(e.message));
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


function *formSagas() {
  // TODO take latest or take every? create a "take first"?
  yield takeEvery(FORM_TYPES.SUBMIT, submit);
  yield takeEvery(FORM_TYPES.SUBMIT_SUCCEEDED, submitSucceeded);
}

export default formSagas;
