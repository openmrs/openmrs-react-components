import { call, put, takeLatest, select } from 'redux-saga/effects';
import sessionApi from '../../rest/sessionRest';
import SESSION_TYPES from './types';
import sessionActions from './actions';
import { axiosInstance } from "../../config";
import { REHYDRATE } from "redux-persist";
import * as R from 'ramda';

function* fetchCurrentSession() {
  try {
    const session = yield call(sessionApi.fetchCurrentSession);
    yield put(sessionActions.fetchSessionSucceeded(session));
  }
  catch (e) {
    yield put(sessionActions.fetchSessionFailed(e.message));
  }
}

function* setSession(action) {
  try {
    const sessionLocation = { location: action.sessionLocation };
    const session = yield call(sessionApi.setCurrentSessionLocation, { location: sessionLocation });
    const authorization = yield select(state => state.openmrs.session.authorization);
    yield put(sessionActions.setSessionSucceeded(session, { authorization : authorization }));
  }
  catch (e) {
    yield put(sessionActions.setSessionFailed(e.message));
  }
}

function* setAuthorization(action) {
  try {
    if (R.path(['payload', 'openmrs', 'session', 'authenticated'], action)){
      var authorization = R.path(['payload', 'openmrs', 'session', 'authorization'], action);
      axiosInstance.defaults.headers.common['Authorization'] = authorization;
    }
  }
  catch (e) {
    yield put(sessionActions.setSessionFailed(e.message));
  }
}

function* sessionSagas() {
  yield takeLatest(SESSION_TYPES.FETCH_REQUESTED, fetchCurrentSession);
  yield takeLatest(SESSION_TYPES.SET_SESSION_LOCATION_REQUESTED, setSession);
  yield takeLatest(REHYDRATE, setAuthorization);
}

export default sessionSagas;
