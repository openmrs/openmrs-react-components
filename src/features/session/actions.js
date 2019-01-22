import SESSION_TYPES, { SET_CURRENT_LOCATION_PREFIX_SUCCEEDED } from "./types";

const fetchSession = () => ( {
  type: SESSION_TYPES.FETCH_REQUESTED
} );

const fetchSessionSucceeded = (session, authorization) => ( {
  type: SESSION_TYPES.FETCH_SUCCEEDED,
  session,
  authorization
} );

const fetchSessionFailed = (message) => ( {
  type: SESSION_TYPES.FETCH_FAILED,
  message: message
} );

const setSessionLocation = (sessionLocation) => ( {
  type: SESSION_TYPES.SET_REQUESTED,
  sessionLocation
} );

const setSessionCurrentLocationPrefix = (currentLocationPrefix) => ( {
  type: SET_CURRENT_LOCATION_PREFIX_SUCCEEDED,
  currentLocationPrefix
} );

const setSessionSucceeded = (session, authorization) => ( {
  type: SESSION_TYPES.SET_SUCCEEDED,
  session,
  authorization
} );

const setSessionFailed = (message) => ( {
  type: SESSION_TYPES.SET_FAILED,
  message: message
} );

const setAuthorizationFailed = (message) => ( {
  type: SESSION_TYPES.SET_AUTHORIZATION_FAILED,
  message: message
} );

export default {
  fetchSession,
  fetchSessionSucceeded,
  fetchSessionFailed,
  setSessionSucceeded,
  setSessionFailed,
  setSessionLocation,
  setAuthorizationFailed,
  setSessionCurrentLocationPrefix
};
