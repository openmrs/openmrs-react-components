import SagaTester from 'redux-saga-tester';
import { reset } from 'redux-form';
import loginSagas from "../sagas";
import loginActions from '../actions';
import { sessionActions } from "../../session";

jest.mock('../../../rest/loginRest');
jest.mock('../../../rest/sessionRest');

describe('login sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(loginSagas);
  });

  it('login saga workflow with valid credentials should succeed', () => {
    sagaTester.dispatch(loginActions.login('valid_username','valid_password', 'valid_location'));
    expect(sagaTester.getCalledActions()).toContainEqual(loginActions.loginSucceeded());
    expect(sagaTester.getCalledActions()).not.toContainEqual(loginActions.loginFailed("Invalid username or password"));
    expect(sagaTester.getCalledActions()).not.toContainEqual(reset('login-form'));
  });

  it('login saga workflow with invalid credentials should fail', () => {
    sagaTester.dispatch(loginActions.login('bad_username','bad_password'));
    expect(sagaTester.getCalledActions()).not.toContainEqual(loginActions.loginSucceeded());
    expect(sagaTester.getCalledActions()).toContainEqual(loginActions.loginFailed("Invalid username or password"));
    expect(sagaTester.getCalledActions()).toContainEqual(reset('login-form'));
  });

});


