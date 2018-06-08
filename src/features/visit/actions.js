import VISIT_TYPES from "./types"

const fetchActiveVisits = (representation) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED,
  representation: representation
} );

const fetchActiveVisitsSucceeded = (visits) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  visits: visits
} );

const fetchActiveVisitsFailed = () => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED
} );

export default {
  fetchActiveVisits,
  fetchActiveVisitsSucceeded,
  fetchActiveVisitsFailed
};
