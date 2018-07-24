import loginActions from '../actions';
import LOGIN_TYPES from '../types';

// these are pretty straigthforward, potentially a bit overkill?

describe('login actions', () => {

  it('should create login action', () => {
    const expectedAction = {
      type: LOGIN_TYPES.LOGIN.REQUESTED,
      username: "someusername",
      password: "somepassword",
      location: "somelocation"
    };
    expect(loginActions.login("someusername", "somepassword", "somelocation")).toEqual(expectedAction);
  });

  it('should create login succeeded action', () => {
    const expectedAction = {
      type: LOGIN_TYPES.LOGIN.SUCCEEDED
    };
    expect(loginActions.loginSucceeded()).toEqual(expectedAction);
  });

  it('should create login failed', () => {
    const expectedAction = {
      type: LOGIN_TYPES.LOGIN.FAILED,
      error: {
        message: "someerror"
      }
    };
    expect(loginActions.loginFailed("someerror")).toEqual(expectedAction);
  });

});
