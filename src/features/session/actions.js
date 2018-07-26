import SESSION_TYPES from "./types";

const fetchSession = () => ( {
  type: SESSION_TYPES.FETCH_REQUESTED
} );

const fetchSessionSucceeded = (session) => ( {
  type: SESSION_TYPES.FETCH_SUCCEEDED,
  session: session
} );

const fetchSessionFailed = (message) => ( {
  type: SESSION_TYPES.FETCH_FAILED,
  message: message
} );

const setSession = (sessionLocation) => ( {
  type: SESSION_TYPES.SET_REQUESTED,
  sessionLocation
} );

const setSessionSucceeded = (session) => ( {
  type: SESSION_TYPES.SET_SUCCEEDED,
  currentSession: session
} );

const setSessionFailed = (message) => ( {
  type: SESSION_TYPES.SET_FAILED,
  message: message
} );

export default {
  fetchSession,
  fetchSessionSucceeded,
  fetchSessionFailed,
  setSessionSucceeded,
  setSessionFailed,
  setSession
};
