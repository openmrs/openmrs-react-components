import { call, put, takeLatest } from 'redux-saga/effects';
import sessionApi from '../../rest/sessionRest';
import SESSION_TYPES from './types';
import sessionActions from './actions';
import { axiosInstance } from "../../config";
import { REHYDRATE } from "redux-persist";

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
    yield put(sessionActions.setSessionSucceeded(session));
  }
  catch (e) {
    yield put(sessionActions.setSessionFailed(e.message));
  }
}

function* setAuthorization(action) {
  try {
    if (action.payload && action.payload.openmrs.session.authenticated && action.payload.openmrs.session.authorization) {
      axiosInstance.defaults.headers.common['Authorization'] = action.payload.openmrs.session.authorization;
    }
  }
  catch (e) {
    yield put(sessionActions.setAuthorizationFailed(e.message));
  }
}

function* sessionSagas() {
  yield takeLatest(SESSION_TYPES.FETCH_REQUESTED, fetchCurrentSession);
  yield takeLatest(SESSION_TYPES.SET_REQUESTED, setSession);
  yield takeLatest(REHYDRATE, setAuthorization);
}

export default sessionSagas;
