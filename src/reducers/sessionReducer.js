import { SESSION_ACTIONS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ACTIONS.FETCH_SUCCEEDED:
      return {
        ...action.session
      };

    case SESSION_ACTIONS.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load session"
        }
      };

    default: return state;
  }
};
