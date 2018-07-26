import { default as sessionReducer } from '../reducers';
import SESSION_TYPES from '../types';

describe('sessionReducer', () => {

  const sampleSession = {
    "authenticated": true,
    "locale": "en_GB",
    "currentProvider": null,
    "sessionLocation": 'sampleLocation',
    "user": {
      "uuid": "1a519576-f284-413e-8b96-1c13256ff8e1",
      "display": "test",
      "username": "test",
      "systemId": "parent-neno_208",
      "userProperties": {
        "loginAttempts": "0"
      },
      "person": {
        "uuid": "431e1e54-6fa2-4fab-b17e-636f3cbceaf2",
        "display": "John Test"
      },
      "privileges": [],
      "roles": [
        {
          "uuid": "8d94f352-c2cc-11de-1d13-0010c6dffd0f",
          "display": "System Developer"
        }
      ],
      "retired": false,
      "resourceVersion": "1.8"
    }

  };

  it('should return the initial state', () => {
    expect(sessionReducer(undefined, {})).toEqual({});
  });

  it('should return the session info', () => {
    const sessionInfo = sessionReducer({}, {
      type: SESSION_TYPES.FETCH_SUCCEEDED,
      session: sampleSession
    });

    expect(sessionInfo.authenticated).toBe(true);
    expect(sessionInfo.user.display).toBe("test");

  });

  it('should return Unable to load session', () => {
    const sessionInfo = sessionReducer({}, {
      type: SESSION_TYPES.FETCH_FAILED,
      error: {
        message: "Unable to load session"
      }
    });

    expect(sessionInfo.error.message).toBe("Unable to load session");

  });

  it('should return the sessionLocation info', () => {
    const sessionInfo = sessionReducer({}, {
      type: SESSION_TYPES.SET_SUCCEEDED,
      sessionLocation: sampleSession
    });

    expect(sessionInfo.sessionLocation).toBe("sampleLocation");

  });

  it('should return Unable to set session', () => {
    const sessionInfo = sessionReducer({}, {
      type: SESSION_TYPES.SET_FAILED,
      error: {
        message: "Unable to set session"
      }
    });

    expect(sessionInfo.error.message).toBe("Unable to set session");

  });

});
