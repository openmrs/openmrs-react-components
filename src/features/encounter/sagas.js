import { call, put, takeLatest } from "redux-saga/effects";
import ENCOUNTER_SEARCH_TYPES from "./types";
import encounterSearchActions from './actions';
import encounterApi from "../../rest/encounterRest";


function* encounterSearch(action) {
  try {

    let response = yield call(encounterApi.getEncounterByPatient, {
      patient: action.patient,
      encounterType: action.encounterType
    });

    yield put(encounterSearchActions.encounterSearchSucceeded(response.results));
  }
  catch (e) {
    yield put(encounterSearchActions.encounterSearchFailed(e.message));
  }
}

function* encounterSearchSagas() {
  yield takeLatest(ENCOUNTER_SEARCH_TYPES.REQUESTED, encounterSearch);
}


export default encounterSearchSagas;
