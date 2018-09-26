import FORM_TYPES from './types';
import { FORM_STATES } from './constants';

export default (state = {}, action) => {

  switch (action.type) {

    case FORM_TYPES.INITIALIZE_FORM:

      return {
        ...state,
        [action.formInstanceUuid]: {
          formId: action.formId,
          state: FORM_STATES.INITIALIZING
        }
      };

    case FORM_TYPES.DESTROY_FORM:

      const { [action.formInstanceUuid]: value, ...updatedState } = state;

      return {
        ...updatedState
      };


    // TODO handle if form hasn't been initialized?
    case FORM_TYPES.SET_FORM_STATE:

      return {
        ...state,
        [action.formInstanceUuid]: {
          ...state[action.formInstanceUuid],
          state: action.state
        }
      };

    // clear out the existing encounter
    case FORM_TYPES.LOAD_FORM_BACKING_ENCOUNTER:

      return {
        ...state,
        [action.formInstanceUuid]: {
          ...state[action.formInstanceUuid],
          encounter: undefined,
        }
      };

    case FORM_TYPES.FORM_BACKING_ENCOUNTER_LOADED:

      return {
        ...state,
        [action.formInstanceUuid]: {
          ...state[action.formInstanceUuid],
          encounter: action.encounter
        }
      };

    default: return state;

  }
};
