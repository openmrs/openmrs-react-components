import { call, put, takeLatest, all } from 'redux-saga/effects';
import loginApi from '../api/loginApi';
import { LOGIN_ACTIONS } from "../actions/types";

function* login() {
  try {
    yield call(loginApi.login);
    yield put({ type: LOGIN_ACTIONS.SUCCEEDED });
  }
  catch (e) {
    yield put({ type: LOGIN_ACTIONS.FAILED });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_ACTIONS.REQUESTED, login)
}


export default watchLogin;
