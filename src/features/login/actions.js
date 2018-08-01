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

const getLoginLogoLinks = () => ( {
  type: LOGIN_TYPES.LOGIN_LOGO_LINKS.REQUESTED
} );

const getLoginLogoLinksSucceeded = (links) => ( {
  type: LOGIN_TYPES.LOGIN_LOGO_LINKS.SUCCEEDED,
  links
} );

const getLoginLogoLinksFailed = (message) => ( {
  type: LOGIN_TYPES.LOGIN_LOGO_LINKS.FAILED,
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
  getLoginLocationsFailed,
  getLoginLogoLinks,
  getLoginLogoLinksSucceeded,
  getLoginLogoLinksFailed
};
