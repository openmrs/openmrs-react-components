import { call, put, takeLatest } from 'redux-saga/effects';
import sessionApi from '../api/sessionApi';

function* fetchCurrentSession() {
  try {
    const session = yield call(sessionApi.fetchCurrentSession);
    yield put({ type: "SESSION_FETCH_SUCCEEDED", session: session });
  } catch (e) {
    yield put({ type: "SESSION_FETCH_FAILED", message: e.message });
  }
}


function* saga() {
  yield takeLatest("SESSION_FETCH_REQUESTED", fetchCurrentSession);
}

export default saga;
