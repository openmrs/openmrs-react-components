import CONCEPT_TYPES from "./types";

const fetchConcepts = (conceptUuids) => ( {
  type: CONCEPT_TYPES.FETCH_REQUESTED,
  conceptUuids: conceptUuids
} );

const fetchConceptsSucceeded = (concepts) => ( {
  type: CONCEPT_TYPES.FETCH_SUCCEEDED,
  concepts: concepts
} );

const fetchConceptsFailed = (message) => ( {
  type: CONCEPT_TYPES.FETCH_FAILED,
  message: message
} );

// TODO add a "clear cache"  reducer

export default {
  fetchConcepts,
  fetchConceptsSucceeded,
  fetchConceptsFailed
};
