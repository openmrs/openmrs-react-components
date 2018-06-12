import PATIENT_SEARCH_TYPES from "./types";

const patientSearch = (query, parseResults, representation) => ( {
  type: PATIENT_SEARCH_TYPES.REQUESTED,
  query: query,
  parseResults: parseResults,
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

const rowSelected = (row) => ( {
  type: PATIENT_SEARCH_TYPES.PATIENT_SELECTED,
  row: row
} );
const clearSelection = () => ( {
  type: PATIENT_SEARCH_TYPES.CLEAR_SELECTED
} );

export default {
  patientSearch,
  patientSearchSucceeded,
  patientSearchFailed,
  rowSelected,
  clearSelection
};
