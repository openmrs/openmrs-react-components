import { call, put, takeEvery } from 'redux-saga/effects';
import FORM_TYPES from './types';
import formActions from './actions';
import encounterRest from '../../rest/encounterRest'

function parse(value) {

  // TODO need to handle fields that aren't obs!
  // TODO set form namespace? how to we match existing values in forms? update data, etc?

  let concept = value[0].split('|')[2].split('=')[1];
  let val = value[1];

  return { concept: concept, value: val };
}

function* submit(action) {

  // TODO double submits, correct form, state, etc

  try {

    let encounter = {
      encounterDatetime: new Date(),  // handle date?
      patient: action.patient.uuid,
      encounterType: action.encounterType.uuid,
      visit: action.visit ? action.visit.uuid : null
    };

    let obs = [];

    // TODO, obviously need to handle values that aren't obs!
    if (action.values) {
      Object.entries(action.values).forEach((value) => {
        obs.push(parse(value));
      });
    }

    encounter.obs = obs;

    yield call(encounterRest.createEncounter, { encounter: encounter });
    yield put(formActions.formSubmitSucceeded(action.values));

    if (action.formSubmittedActionCreator) {
      yield put(action.formSubmittedActionCreator(action.values));
    }

  }
  catch (e) {
    yield put(formActions.formSubmitFailed(action.values, action.encounterType, action.patient));
  }
}


function *formSagas() {
  // TODO take latest or take every? create a "take first"?
  yield takeEvery(FORM_TYPES.SUBMIT, submit);
}

export default formSagas;
