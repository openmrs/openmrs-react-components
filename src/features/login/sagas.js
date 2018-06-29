import { call, put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form';
import loginApi from '../../rest/loginRest';
import LOGIN_TYPES from './types';
import loginActions from './actions';
import { sessionActions } from "../session";


// we export this for testing
function* login(action) {
  try {

    let response = yield call(loginApi.login, { username: action.username, password: action.password });

    if (response.authenticated === true) {
      yield put(sessionActions.fetchSession());
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


function* loginSagas() {
  yield takeLatest(LOGIN_TYPES.REQUESTED, login);
}


export default loginSagas;
