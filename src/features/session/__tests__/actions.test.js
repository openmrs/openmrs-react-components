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

});
