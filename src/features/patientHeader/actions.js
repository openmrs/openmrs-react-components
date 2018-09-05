import PATIENT_HEADER_TYPES from "./types";

const getPatient = patientUuid => ({
  type: PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED,
  payload: {
    patientUuid,
  },
});

const getPatientSucceeded = patientRecord => ({
  type: PATIENT_HEADER_TYPES.SET_PATIENT.SUCCEEDED,
  payload: patientRecord,
});

const getPatientFailed = message => ({
  type: PATIENT_HEADER_TYPES.SET_PATIENT.FAILED,
  error: {
    message,
  },
});

export default {
  getPatient,
  getPatientSucceeded,
  getPatientFailed,
};
