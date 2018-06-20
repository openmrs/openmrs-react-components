import loginSagas from "../sagas";
import SagaTester from 'redux-saga-tester';
import loginActions from '../actions';
import { sessionActions } from "../../session";

jest.mock('../../../rest/loginRest');

describe('login sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(loginSagas);
  });

  it('tests the login saga workflow with valid credentials', () => {
    sagaTester.dispatch(loginActions.login('valid_username','valid_password'));
    expect(sagaTester.getCalledActions()).toContainEqual(sessionActions.fetchSession());
    expect(sagaTester.getCalledActions()).toContainEqual(loginActions.loginSucceeded());
  });

  it('tests the login saga workflow with invalid credentials', () => {
    sagaTester.dispatch(loginActions.login('bad_username','bad_password'));
    expect(sagaTester.getCalledActions()).toContainEqual(loginActions.loginFailed("Invalid credentials"));
  });

});


