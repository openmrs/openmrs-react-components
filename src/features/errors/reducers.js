import ERROR_TYPES from './types';

const initialState = [];

// handles *all* events, and for any event that has an error, add it to the state
export default (state = initialState, action) => {

  if (action.type === ERROR_TYPES.CLEAR_ERRORS) {
    return [];
  } else if (action.error) {
    return [...state, action.error];
  }

  return state;

};
