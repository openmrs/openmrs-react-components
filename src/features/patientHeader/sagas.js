import { call, put, takeLatest } from 'redux-saga/effects';
import patientHeaderApi from '../../rest/patientRest';
import PATIENT_HEADER_TYPES from './types';
import patientHeaderAction from './actions';

function* getPatient(action) {
  try {
    const response = yield call(patientHeaderApi.getPatient, {
      patientUuid: action.payload.patientUuid,
    });
    if (response) {
      yield put(patientHeaderAction.getPatientSucceeded(response));
    }
  } catch (e) {
    yield put(patientHeaderAction.getPatientFailed(e.message));
  }
}

function* patientSagas() {
  yield takeLatest(PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED, getPatient);
}


export default patientSagas;
