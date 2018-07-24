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

    default:
      return state;
  }
};
