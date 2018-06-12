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

    if (response.status === 200) {
      yield put(patientSearchActions.patientSearchSucceeded(action.parseResults ? action.parseResults(response.data.results) : response.data.results));
    } else {
      yield put(patientSearchActions.patientSearchFailed("Failed to find patients"));
    }

  }
  catch (e) {
    yield put(patientSearchActions.patientSearchFailed(e.message));
  }
}

function* patientSearchSagas() {
  yield takeLatest(PATIENT_SEARCH_TYPES.REQUESTED, patientSearch);
}


export default patientSearchSagas;
