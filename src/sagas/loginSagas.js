import { call, put, takeLatest, all } from 'redux-saga/effects';
import { axiosInstance} from "../config";
import loginApi from '../api/loginApi';
import { LOGIN_ACTIONS } from "../actions/types";

function* login(action) {
  try {

    // TODO error handling, etc?

    var response = yield call(loginApi.login, { username: action.username, password: action.password });

    if (response.authenticated == true) {
      axiosInstance.defaults.headers.common['Authorization'] = response.sessionId;
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


function* watchLoginRequested() {
  yield takeLatest(LOGIN_ACTIONS.REQUESTED, login)
}


export default watchLoginRequested;
