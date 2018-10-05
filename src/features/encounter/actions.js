import ENCOUNTER_SEARCH_TYPES from "./types";

const encounterSearch = (patient, encounterType) => ( {
  type: ENCOUNTER_SEARCH_TYPES.REQUESTED,
  patient: patient,
  encounterType: encounterType
} );

const encounterSearchSucceeded = (results) => ( {
  type: ENCOUNTER_SEARCH_TYPES.SUCCEEDED,
  results: results
} );

const encounterSearchFailed = (message) => ( {
  type: ENCOUNTER_SEARCH_TYPES.FAILED,
  message: message
} );

export default {
  encounterSearch,
  encounterSearchSucceeded,
  encounterSearchFailed
};
