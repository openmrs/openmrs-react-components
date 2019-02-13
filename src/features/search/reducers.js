import PATIENT_SEARCH_TYPES from "./types";

const initialState = {
  query: '',
  searchType: ''
};

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
    case PATIENT_SEARCH_TYPES.SAVE_ACTIVE_SEARCH: {
      return {
        ...state,
        query: action.query,
        searchType: action.searchType
      };
    }

    default:
      return state;
  }
};
