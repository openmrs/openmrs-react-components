import sessionSagas from "../sagas";
import SagaTester from 'redux-saga-tester';
import sessionActions from '../actions';

jest.mock('../../../rest/sessionRest');

describe('session sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(sessionSagas);
  });

  it('tests the session saga workflow with successfull fetch', () => {
    sagaTester.dispatch(sessionActions.fetchSession());
    expect(sagaTester.getCalledActions()).toContainEqual(sessionActions.fetchSession());
    expect(sagaTester.getCalledActions()).toContainEqual(sessionActions.fetchSessionSucceeded());
  });

});
