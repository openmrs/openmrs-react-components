import PATIENT_SEARCH_TYPES from "./types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_SEARCH_TYPES.REQUESTED: 
      return Object.assign({}, state, {
        isUpdating: true
      });

    case PATIENT_SEARCH_TYPES.SUCCEEDED:
      return Object.assign({}, state, {
        results: action.results,
        isUpdating: false
      });

    case PATIENT_SEARCH_TYPES.FAILED:
      return {
        error: {
          message: "Unable to find patients"
        },
        isUpdating: false
      };

    case PATIENT_SEARCH_TYPES.CLEAR_SEARCH:
      return {
        isUpdating: false
      };

    default:
      return state;
  }
};
