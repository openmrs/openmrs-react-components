import { call, put, takeLatest } from 'redux-saga/effects';
import VISIT_TYPES from './types';
import visitApi from '../../api/visitApi';
import visitActions from './actions';

function* activeVisits(action) {

  try {

    let response = yield call(visitApi.getActiveVisits, {
      representation: action.representation
    });

    if (response.status === 200) {
      yield put(visitActions.fetchActiveVisitsSucceeded(response.data.results));
    } else {
      yield put(visitActions.fetchActiveVisitsFailed("Failed to fetch active visits"));
    }

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
