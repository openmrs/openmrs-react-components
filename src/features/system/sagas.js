import { call, put, race, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import systemRest from '../../rest/systemRest';
import types from './types';

const POLL_INTERVAL = 10000;  // 10000 ms = 10 sec

function* systemWorkerSaga() {
  while (true) {
    try {
      const response = yield call(systemRest.getSystem);
      yield put({ type: types.SYSTEM_POLL_SUCCESS, data: response.systemInfo });
      yield call(delay, POLL_INTERVAL);
    } catch (err) {
      yield put({ type: types.SYSTEM_POLL_FAILURE, error: err });
      yield call(delay, POLL_INTERVAL);
    }
  }
}

function* systemWatcherSaga() {
  while (true) {
    yield take(types.SYSTEM_POLL_START);
    yield race([
      call(systemWorkerSaga),
      take(types.SYSTEM_POLL_STOP)
    ]);
  }
}

export default systemWatcherSaga;
