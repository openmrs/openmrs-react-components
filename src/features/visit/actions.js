import VISIT_TYPES from "./types";

const fetchActiveVisits = (location, rep) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED,
  representation: rep,
  location: location
} );

const fetchActiveVisitsSucceeded = (visits) => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  visits: visits
} );

const fetchActiveVisitsFailed = () => ( {
  type: VISIT_TYPES.ACTIVE_VISITS.FETCH_FAILED
} );


const fetchInactiveVisits = (fromStartDate, location, rep) => ( {
  type: VISIT_TYPES.INACTIVE_VISITS.FETCH_REQUESTED,
  representation: rep,
  fromStartDate: fromStartDate,
  location: location
} );

const fetchInactiveVisitsSucceeded = (visits) => ( {
  type: VISIT_TYPES.INACTIVE_VISITS.FETCH_SUCCEEDED,
  visits: visits
} );

const fetchInactiveVisitsFailed = () => ( {
  type: VISIT_TYPES.INACTIVE_VISITS.FETCH_FAILED
} );

const fetchPatientActiveVisit = (patientUuid, rep) => ( {
    type: VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_REQUESTED,
    patientUuid: patientUuid,
    representation: rep
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
  fetchInactiveVisits,
  fetchInactiveVisitsSucceeded,
  fetchInactiveVisitsFailed,
  fetchPatientActiveVisit,
  fetchPatientActiveVisitSucceeded,
  fetchPatientActiveVisitFailed
};
