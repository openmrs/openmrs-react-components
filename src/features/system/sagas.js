import { call, put, race, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import systemRest from '../../rest/systemRest';
import types from './types';


function* systemWorkerSaga() {
  while (true) {
    try {
      const response = yield call(systemRest.getSystem);
      yield put({ type: types.SYSTEM_POLL_SUCCESS, data: response.systemInfo });
      yield call(delay, 4000);
    } catch (err) {
      yield put({ type: types.SYSTEM_POLL_FAILURE, error: err });
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