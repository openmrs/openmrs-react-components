import { call, put, takeLatest } from 'redux-saga/effects';
import sessionApi from '../api/sessionApi';
import { SESSION_ACTIONS } from "../actions/types";

function* fetchCurrentSession() {
  try {
    const session = yield call(sessionApi.fetchCurrentSession);
    yield put({ type: SESSION_ACTIONS.FETCH_SUCCEEDED, session: session });
  }
  catch (e) {
    yield put({ type: SESSION_ACTIONS.FETCH_FAILED, message: e.message });
  }
}

function* watchFetchCurrentSession() {
  yield takeLatest(SESSION_ACTIONS.FETCH_REQUESTED, fetchCurrentSession);
}

export default watchFetchCurrentSession;
