import { call, put, takeLatest } from "redux-saga/effects";
import PATIENT_SEARCH_TYPES from "./types";
import patientSearchActions from './actions';
import patientApi from "../../rest/patientRest";


function* patientSearch(action) {
  try {

    let response = yield call(patientApi.findPatient, {
      query: action.query,
      representation: action.representation
    });
    if (action.activeSearchType) {
      yield put(patientSearchActions.saveActiveSearchQuery(action.query, action.activeSearchType));
    }
    yield put(patientSearchActions.patientSearchSucceeded(action.parseResults ? action.parseResults(response.results) : response.results));
  }
  catch (e) {
    yield put(patientSearchActions.patientSearchFailed(e.message));
  }
}

function* patientSearchSagas() {
  yield takeLatest(PATIENT_SEARCH_TYPES.REQUESTED, patientSearch);
}


export default patientSearchSagas;
