import HEADER_TYPES from "./types";

const initialState = {
  headerLogoLinks: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case HEADER_TYPES.LOGO_LINKS.SUCCEEDED:
      return Object.assign({}, state, {
        headerLogoLinks: { 
          logoLinkUrl: action.links[0].extensionParams['logo-link-url'],
          logoIconUrl: action.links[0].extensionParams['logo-icon-url']
        }
      });

    case HEADER_TYPES.LOGO_LINKS.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load header logo links"
        }
      };

    default:
      return state;
  }
};
