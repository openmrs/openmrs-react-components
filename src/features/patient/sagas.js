
import { all, put, select, takeLatest } from 'redux-saga/effects';
import PATIENT_TYPES from "./types";
import { selectors } from "../../store";

function* callSelectPatientActionCreators(action) {

  const selectPatientActionCreators = yield select(selectors.getSelectPatientActionCreators);

  const patient = action.patient ? action.patient : yield select(selectors.getSelectedPatientFromStore);

  if (selectPatientActionCreators) {
    yield all(
      selectPatientActionCreators.map((actionCreator) => put(actionCreator(patient)))
    );
  }
}


function* patientSagas() {
  yield takeLatest(PATIENT_TYPES.SET_SELECTED_PATIENT, callSelectPatientActionCreators);
  yield takeLatest(PATIENT_TYPES.REFRESH_SELECTED_PATIENT, callSelectPatientActionCreators);
}

export default patientSagas;
