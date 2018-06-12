import {call, put, takeLatest} from 'redux-saga/effects';
import sessionApi from '../../rest/sessionRest';
import SESSION_TYPES from './types';
import sessionActions from './actions';

function* fetchCurrentSession() {
  try {
    const session = yield call(sessionApi.fetchCurrentSession);
    yield put(sessionActions.fetchSessionSucceeded(session));
  }
  catch (e) {
    yield put(sessionActions.fetchSessionFailed(e.message));
  }
}

function* sessionSagas() {
  yield takeLatest(SESSION_TYPES.FETCH_REQUESTED, fetchCurrentSession);
}

export default sessionSagas;
