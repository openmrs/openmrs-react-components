import { LOCATION_TYPES } from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOCATION_TYPES.FETCH_SUCCEEDED:
      return {
        ...state,
        locationTags: action.locationTags,
      };
    case LOCATION_TYPES.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load location"
        }
      };
    default: return state;
  }
};
