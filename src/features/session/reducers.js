import SESSION_TYPES from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_TYPES.FETCH_SUCCEEDED:
      return {
        ...action.session
      };

    case SESSION_TYPES.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load session"
        }
      };

    default:
      return state;
  }
};
