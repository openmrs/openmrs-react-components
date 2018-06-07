import { call, put, takeLatest } from "redux-saga/effects";
import PATIENT_SEARCH_TYPES from "./types";
import patientSearchActions from "./actions";
import patientApi from "../../api/patientApi";


function* patientSearch(action) {
  try {

    let response = yield call(patientApi.findPatient, {
      query: action.query,
      representation: action.representation
    });

    if (response.status === 200) {
      yield put(patientSearchActions.patientSearchSucceeded(response.data.results));
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