import { call, put, takeEvery } from "redux-saga/effects";

import PATIENT_IDENTIFIER_TYPES_TYPES from "./types";
import patientsIdentifierTypeActions from "./actions";
import patientApi from "../../rest/patientRest";

function* fetchPatientIdentifierTypes() {
  try {

    const results =  yield call(patientApi.getPatientIdentifierTypes);
    yield put(patientsIdentifierTypeActions.fetchPatientIdentifierTypesSucceeded(results));
  }
  catch (e) {
    yield put(patientsIdentifierTypeActions.fetchPatientIdentifierTypesFailed(e.message));
  }

}

function* patientIdentifierTypeSagas() {
  yield takeEvery(PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_REQUESTED, fetchPatientIdentifierTypes);
}

export default patientIdentifierTypeSagas;
