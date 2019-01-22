import SESSION_TYPES, { SET_CURRENT_LOCATION_PREFIX_SUCCEEDED } from "./types";

export default (state = {}, action) => {
  switch (action.type) {
    case SESSION_TYPES.FETCH_SUCCEEDED:
      return {
        ...action.session,
        ...action.authorization
      };

    case SET_CURRENT_LOCATION_PREFIX_SUCCEEDED:
      return { ...state, currentLocationPrefix: action.currentLocationPrefix };

    case SESSION_TYPES.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load session"
        }
      };
      
    case SESSION_TYPES.SET_SUCCEEDED:
      return {
        ...action.session,
        ...action.authorization
      };

    case SESSION_TYPES.SET_FAILED:
      return {
        error: {
          message: "Unable to set session"
        }
      };

    default:
      return state;
  }
};


export const getSessionLocation = (state) => {
  return state.sessionLocation;
};
