import FETCH_ENCOUNTERS_TYPES from "./types";

const fetchEncounters = (patient, encounterType) => ( {
  type: FETCH_ENCOUNTERS_TYPES.REQUESTED,
  patient: patient,
  encounterType: encounterType
} );

// TODO: change from "results" to "encounters"
const fetchEncountersSucceeded = (results) => ( {
  type: FETCH_ENCOUNTERS_TYPES.SUCCEEDED,
  results: results
} );

const fetchEncountersFailed = (message) => ( {
  type: FETCH_ENCOUNTERS_TYPES.FAILED,
  message: message
} );

export default {
  fetchEncounters,
  fetchEncountersSucceeded,
  fetchEncountersFailed
};
