import sessionActions from '../actions';
import SESSION_TYPES from '../types';

// these are pretty straigthforward, potentially a bit overkill?

describe('session actions', () => {

  it('should create session fetch action', () => {
    const expectedAction = {
      type: SESSION_TYPES.FETCH_REQUESTED
    };
    expect(sessionActions.fetchSession()).toEqual(expectedAction);
  });

  it('should create session succeededaction', () => {
    const expectedAction = {
      type: SESSION_TYPES.FETCH_SUCCEEDED
    };
    expect(sessionActions.fetchSessionSucceeded()).toEqual(expectedAction);
  });

  it('should create fetch session failed', () => {
    const expectedAction = {
      type: SESSION_TYPES.FETCH_FAILED,
      message: "someerror"
    };
    expect(sessionActions.fetchSessionFailed("someerror")).toEqual(expectedAction);
  });

  it('should create session set action', () => {
    const expectedAction = {
      type: SESSION_TYPES.SET_REQUESTED,
      sessionLocation: "Amani_hospital", 
    };
    expect(sessionActions.setSession("Amani_hospital")).toEqual(expectedAction);
  });

  it('should create set session succeeded action', () => {
    const expectedAction = {
      type: "session/SET_SUCCEEDED",
      currentSession: "Amani_hospital",
    };
    expect(sessionActions.setSessionSucceeded("Amani_hospital")).toEqual(expectedAction);
  });

  it('should create set session failed', () => {
    const expectedAction = {
      type: SESSION_TYPES.SET_FAILED,
      message: "someerror"
    };
    expect(sessionActions.setSessionFailed("someerror")).toEqual(expectedAction);
  });

});
