import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import VISIT_TYPES from './types';
import visitApi from '../../rest/visitRest';
import visitActions from './actions';
import patientActions from '../patient/actions';
import { DEFAULT_VISIT_REP } from '../../domain/visit/constants';

function* activeVisits(action) {

  try {

    yield put(patientActions.setPatientStoreUpdating());

    let response = yield call(visitApi.getActiveVisits, {
      representation: action.representation ? action.representation : "custom:" + DEFAULT_VISIT_REP,
      location: action.location
    });
    let results = response.results;

    if (action.setPatientStore && results) {
      yield put(patientActions.setPatientStore(results.map(v => v.patient)));
    }

    yield put(patientActions.updateActiveVisitsInStore(results && results.length > 0 ? results : null));
    yield put(visitActions.fetchActiveVisitsSucceeded(results && results.length > 0 ? results : null));
  }
  catch (e) {
    yield put(visitActions.fetchActiveVisitsFailed(e.message));
  }

}

// TODO are we doing the right thing here?  should this be updating the store in some way?
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

    yield put(patientActions.setPatientStoreUpdating());

    let response = yield call(visitApi.getPatientActiveVisit, {
      patientUuid: action.patientUuid,
      representation: action.representation ? action.representation : "custom:" + DEFAULT_VISIT_REP
    });
    yield put(patientActions.updateActiveVisitsInStore(response.results[0] ? [response.results[0]] : null));
    yield put(visitActions.fetchPatientActiveVisitSucceeded(response.results[0]));
  }
  catch (e) {
    yield put(visitActions.fetchPatientActiveVisitFailed(e.message));
  }

}


function* visitSagas() {
  yield takeLatest(VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED, activeVisits);
  yield takeEvery(VISIT_TYPES.INACTIVE_VISITS.FETCH_REQUESTED, inactiveVisits);
  yield takeEvery(VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_REQUESTED, patientActiveVisit);
}

export default visitSagas;
