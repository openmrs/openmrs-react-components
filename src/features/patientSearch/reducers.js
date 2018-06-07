import PATIENT_SEARCH_TYPES from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_SEARCH_TYPES.SUCCEEDED:
      return Object.assign({}, state, {
        results: action.results
      });

    case PATIENT_SEARCH_TYPES.FAILED:
      return {
        error: {
          message: "Unable to find patients"
        }
      };

    default: return state;
  }
};
