import VISIT_TYPES from "./types";

const fetchActiveVisits = (representation) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED,
  representation: representation
} );

const fetchActiveVisitsSucceeded = (visits) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  visits: visits
} );

const fetchActiveVisitsFailed = () => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_FAILED
} );

const fetchPatientActiveVisit = (patientUuid, representation) => ( {
    type: VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_REQUESTED,
    patientUuid: patientUuid,
    representation: representation
  }
);

const fetchPatientActiveVisitSucceeded = (visit) => ( {
  type: VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_SUCCEEDED,
  patientActiveVisit: visit
} );

const fetchPatientActiveVisitFailed = () => ( {
  type: VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_FAILED
} );

export default {
  fetchActiveVisits,
  fetchActiveVisitsSucceeded,
  fetchActiveVisitsFailed,
  fetchPatientActiveVisit,
  fetchPatientActiveVisitSucceeded,
  fetchPatientActiveVisitFailed
};
