import LOGIN_TYPES from "./types";

const login = (username, password) => ( {
  type: LOGIN_TYPES.REQUESTED,
  username: username,
  password: password
} );

const loginSucceeded = () => ( {
  type: LOGIN_TYPES.SUCCEEDED
} );

const loginFailed = (message) => ( {
  type: LOGIN_TYPES.FAILED,
  message: message
} );

export default {
  login,
  loginSucceeded,
  loginFailed
}
