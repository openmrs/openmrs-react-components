import PATIENT_SEARCH_TYPES from "./types";

const patientSearch = (query, parseResults, representation, activeSearchType) => ( {
  type: PATIENT_SEARCH_TYPES.REQUESTED,
  query: query,
  parseResults: parseResults,
  representation: representation,
  activeSearchType
} );

const patientSearchSucceeded = (results) => ( {
  type: PATIENT_SEARCH_TYPES.SUCCEEDED,
  results: results
} );

const patientSearchFailed = (message) => ( {
  type: PATIENT_SEARCH_TYPES.FAILED,
  message: message
} );

const clearPatientSearch = () => ( {
  type: PATIENT_SEARCH_TYPES.CLEAR_SEARCH
});

const saveActiveSearchQuery = (query, searchType) => ({
  type: PATIENT_SEARCH_TYPES.SAVE_ACTIVE_SEARCH,
  query,
  searchType
});

export default {
  patientSearch,
  patientSearchSucceeded,
  patientSearchFailed,
  clearPatientSearch,
  saveActiveSearchQuery
};
