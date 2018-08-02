import LOGIN_TYPES from "./types";

const login = (username, password, location) => ( {
  type: LOGIN_TYPES.LOGIN.REQUESTED,
  username: username,
  password: password,
  location: location
} );

const loginSucceeded = () => ( {
  type: LOGIN_TYPES.LOGIN.SUCCEEDED
} );

const loginFailed = (message) => ( {
  type: LOGIN_TYPES.LOGIN.FAILED,
  error: {
    message: message
  }
} );

const getLoginLocations = () => ( {
  type: LOGIN_TYPES.LOGIN_LOCATIONS.REQUESTED
} );

const getLoginLocationsSucceeded = (locations) => ( {
  type: LOGIN_TYPES.LOGIN_LOCATIONS.SUCCEEDED,
  locations: locations.map((location) => {
    return {
      uuid: location.uuid,
      display: location.display
    };
  })
} );

const getLoginLocationsFailed = (message) => ( {
  type: LOGIN_TYPES.LOGIN_LOCATIONS.FAILED,
  error: {
    message: message
  }
} );

export default {
  login,
  loginSucceeded,
  loginFailed,
  getLoginLocations,
  getLoginLocationsSucceeded,
  getLoginLocationsFailed
};
