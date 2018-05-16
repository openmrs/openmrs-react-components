import { call, put, takeLatest } from 'redux-saga/effects';
import loginApi from '../api/loginApi';
import { LOGIN_ACTIONS } from "../actions/types";

function* login(action) {
  try {

    let response = yield call(loginApi.login, { username: action.username, password: action.password });

    if (response.authenticated === true) {
      yield put({ type: LOGIN_ACTIONS.SUCCEEDED });
    }
    else {
      yield put({ type: LOGIN_ACTIONS.FAILED, message: "Invalid credentials" });
    }
  }
  catch (e) {
    yield put({ type: LOGIN_ACTIONS.FAILED, message: e.message  });
  }
}


function* loginSagas() {
  yield takeLatest(LOGIN_ACTIONS.REQUESTED, login)
}


export default loginSagas;
