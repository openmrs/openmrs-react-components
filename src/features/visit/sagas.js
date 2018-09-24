import { call, put, takeLatest } from 'redux-saga/effects';
import VISIT_TYPES from './types';
import visitApi from '../../rest/visitRest';
import visitActions from './actions';
import { DEFAULT_VISIT_REP } from '../../domain/visit/constants';

function* activeVisits(action) {

  try {

    let response = yield call(visitApi.getActiveVisits, {
      representation: action.representation ? action.representation : "custom:" + DEFAULT_VISIT_REP
    });
    let filteredResults = response.results;
    if (action.location) {
      filteredResults = response.results.filter(visit => visit.location.uuid === action.location);
    }
    yield put(visitActions.fetchActiveVisitsSucceeded(filteredResults));
  }
  catch (e) {
    yield put(visitActions.fetchActiveVisitsFailed(e.message));
  }

}

function* inactiveVisits(action) {

  try {

    let response = yield call(visitApi.getVisitsStartedBeforeDate, {
      representation: action.representation ? action.representation : "custom:" + DEFAULT_VISIT_REP,
      fromStartDate: action.fromStartDate
    });
    let filteredResults = response.results.filter(visit => visit.stopDatetime !== null);

    if (action.location) {
      filteredResults = filteredResults.filter(visit => visit.location.uuid === action.location);
    }
    yield put(visitActions.fetchInactiveVisitsSucceeded(filteredResults));
  }
  catch (e) {
    yield put(visitActions.fetchInactiveVisitsFailed(e.message));
  }

}

function* patientActiveVisit(action) {

  try {

    let response = yield call(visitApi.getPatientActiveVisit, {
      patientUuid: action.patientUuid,
      representation: action.representation ? action.representation : "custom:" + DEFAULT_VISIT_REP
    });

    yield put(visitActions.fetchPatientActiveVisitSucceeded(response.results[0]));
  }
  catch (e) {
    yield put(visitActions.fetchPatientActiveVisitFailed(e.message));
  }

}


function* visitSagas() {
  // TODO take latest, or take all?
  yield takeLatest(VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED, activeVisits);
  yield takeLatest(VISIT_TYPES.INACTIVE_VISITS.FETCH_REQUESTED, inactiveVisits);
  yield takeLatest(VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_REQUESTED, patientActiveVisit);
}

export default visitSagas;
