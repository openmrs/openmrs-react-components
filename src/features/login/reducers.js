import LOGIN_TYPES from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TYPES.LOGIN_LOCATIONS.SUCCEEDED:
      return Object.assign({}, state, {
        list: action.locations
      });

    case LOGIN_TYPES.LOGIN_LOCATIONS.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load login locations"
        }
      };

    case LOGIN_TYPES.LOGIN_LOGO_LINKS.SUCCEEDED:
      return Object.assign({}, state, {
        headerLogoLinks: { 
          logoLinkUrl: action.links[0].extensionParams['logo-link-url'],
          logoIconUrl: action.links[0].extensionParams['logo-icon-url']
        }
      });

    case LOGIN_TYPES.LOGIN_LOGO_LINKS.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load login logo links"
        }
      };

    default:
      return state;
  }
};
