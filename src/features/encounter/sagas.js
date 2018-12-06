import { call, put, takeLatest } from "redux-saga/effects";
import FETCH_ENCOUNTERS_TYPES from "./types";
import fetchEncountersActions from './actions';
import encounterRest from "../../rest/encounterRest";


function* fetchEncounters(action) {
  try {

    let response = yield call(encounterRest.fetchEncountersByPatient, {
      patient: action.patient,
      encounterType: action.encounterType
    });

    yield put(fetchEncountersActions.fetchEncountersSucceeded(response.results));
  }
  catch (e) {
    yield put(fetchEncountersActions.fetchEncountersFailed(e.message));
  }
}

function* fetchEncountersSagas() {
  yield takeLatest(FETCH_ENCOUNTERS_TYPES.REQUESTED, fetchEncounters);
}


export default fetchEncountersSagas;
