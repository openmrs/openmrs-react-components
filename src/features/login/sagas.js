import { call, put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form';
import loginApi from '../../rest/loginRest';
import sessionApi from '../../rest/sessionRest';
import locationApi from '../../rest/locationRest';
import LOGIN_TYPES from './types';
import loginActions from './actions';
import { sessionActions } from "../session";


// we export this for testing
function* login(action) {
  try {

    let response = yield call(loginApi.login, { username: action.username, password: action.password });

    if (response.authenticated === true) {
      let sessionLocation = { location: action.location };
      let sessionResponse = yield call(sessionApi.setCurrentSessionLocation, { location: sessionLocation });
      yield put(sessionActions.fetchSessionSucceeded(sessionResponse));
      yield put(loginActions.loginSucceeded());
    }
    else {
      yield put(loginActions.loginFailed("Invalid username or password"));
      yield put(reset('login-form'));
    }
  }
  catch (e) {
    yield put(loginActions.loginFailed(e.message));
    yield put(reset('login-form'));
  }
}

function* loginLocations(action) {
  try {

    let response = yield call(locationApi.fetchLoginLocations);
    if (response.results.length > 0 ) {
      yield put(loginActions.getLoginLocationsSucceeded(response.results));
    }

  }
  catch (e) {
    yield put(loginActions.getLoginLocationsFailed(e.message));
  }
}

function* loginSagas() {
  yield takeLatest(LOGIN_TYPES.LOGIN.REQUESTED, login);
  yield takeLatest(LOGIN_TYPES.LOGIN_LOCATIONS.REQUESTED, loginLocations);
}


export default loginSagas;
