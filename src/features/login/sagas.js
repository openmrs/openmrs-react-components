import { call, put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form';
import loginRest from '../../rest/loginRest';
import sessionRest from '../../rest/sessionRest';
import locationRest from '../../rest/locationRest';
import LOGIN_TYPES from './types';
import loginActions from './actions';
import { sessionActions } from "../session";


// we export this for testing
function* login(action) {
  try {

    var authorization = { 'authorization' : "Basic " + btoa(action.username + ':' + action.password) };
    let response = yield call(loginRest.login, authorization);

    if (response.authenticated === true) {
      let sessionLocation = { location: action.location };
      let sessionResponse = yield call(sessionRest.setCurrentSessionLocation, { location: sessionLocation });
      yield put(sessionActions.fetchSessionSucceeded(sessionResponse, authorization));
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

    let response = yield call(locationRest.fetchLoginLocations);
    if (response.results.length > 0 ) {
      yield put(loginActions.getLoginLocationsSucceeded(response.results));
    } else {
      yield put(loginActions.getLoginLocationsFailed("Login Locations not configured"));
      yield put(reset('login-form'));
    }

  }
  catch (e) {
    yield put(loginActions.getLoginLocationsFailed(e.message));
    yield put(reset('login-form'));
  }
}

function* logout(action) {
  try {
    yield call(loginRest.logout);
    yield put(loginActions.logoutSucceeded());
  }
  catch (e) {
    yield put(loginActions.logoutFailed(e.message));
  }
}

function* loginSagas() {
  yield takeLatest(LOGIN_TYPES.LOGIN.REQUESTED, login);
  yield takeLatest(LOGIN_TYPES.LOGIN_LOCATIONS.REQUESTED, loginLocations);
  yield takeLatest(LOGIN_TYPES.LOGOUT.REQUESTED, logout);
}


export default loginSagas;
