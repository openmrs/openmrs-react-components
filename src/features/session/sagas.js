import { call, put, takeLatest } from 'redux-saga/effects';
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

function* setSession(sessionLocation) {
  try {
    const session = yield call(sessionApi.setSession(sessionLocation));
    yield put(sessionActions.setSessionSucceeded(session));
  }
  catch (e) {
    yield put(sessionActions.setSessionFailed(e.message));
  }
}

function* sessionSagas() {
  yield takeLatest(SESSION_TYPES.FETCH_REQUESTED, fetchCurrentSession);
  yield takeLatest(SESSION_TYPES.SET_REQUESTED, setSession);
}

export default sessionSagas;
