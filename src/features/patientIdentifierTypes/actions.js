import PATIENT_IDENTIFIER_TYPES_TYPES from "./types";

const fetchPatientIdentifierTypes = () => ({ type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_REQUESTED });

const fetchPatientIdentifierTypesSucceeded = (patientIdentifierTypesResult) => ( { 
  type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_SUCCEEDED,
  patientIdentifierTypes: patientIdentifierTypesResult.results
} );

const fetchPatientIdentifierTypesFailed = (message) => ( {
  type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_FAILED,
  message: message
} );

export default {
  fetchPatientIdentifierTypes,
  fetchPatientIdentifierTypesSucceeded,
  fetchPatientIdentifierTypesFailed
};
