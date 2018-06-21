import { call, put, takeLatest } from 'redux-saga/effects';
import VISIT_TYPES from './types';
import visitApi from '../../rest/visitRest';
import visitActions from './actions';

function* activeVisits(action) {

  try {

    let response = yield call(visitApi.getActiveVisits, {
      representation: action.representation
    });

    yield put(visitActions.fetchActiveVisitsSucceeded(response.results));
  }
  catch (e) {
    yield put(visitActions.fetchActiveVisitsFailed(e.message));
  }

}


function* visitSagas() {
  // TODO take latest, or take all?
  yield takeLatest(VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED, activeVisits);
}

export default visitSagas;
