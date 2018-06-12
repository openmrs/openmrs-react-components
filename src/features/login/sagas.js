import {call, put, takeLatest} from 'redux-saga/effects';
import loginApi from '../../rest/loginRest';
import LOGIN_TYPES from './types';
import loginActions from './actions';
import {sessionActions} from "../session/index";

function* login(action) {
  try {

    let response = yield call(loginApi.login, { username: action.username, password: action.password });

    if (response.authenticated === true) {
      yield put(sessionActions.fetchSession());
      yield put(loginActions.loginSucceeded());
    }
    else {
      yield put(loginActions.loginFailed("Invalid credentials"));
    }
  }
  catch (e) {
    yield put(loginActions.loginFailed(e.message));
  }
}


function* loginSagas() {
  yield takeLatest(LOGIN_TYPES.REQUESTED, login);
}


export default loginSagas;
