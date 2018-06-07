import PATIENT_SEARCH_TYPES from "./types";

const patientSearch = (query, representation) => ( {
  type: PATIENT_SEARCH_TYPES.REQUESTED,
  query: query,
  representation: representation
} );

const patientSearchSucceeded = (results) => ( {
  type: PATIENT_SEARCH_TYPES.SUCCEEDED,
  results: results
} );

const patientSearchFailed = (message) => ( {
  type: PATIENT_SEARCH_TYPES.FAILED,
  message: message
} );

export default {
  patientSearch,
  patientSearchSucceeded,
  patientSearchFailed
}
