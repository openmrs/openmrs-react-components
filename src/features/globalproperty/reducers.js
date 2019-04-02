import GLOBAL_PROPERTIES_TYPES from './types';

export const globalPropertyReducer = (state = {}, action) => {

  switch (action.type) {
    case GLOBAL_PROPERTIES_TYPES.FETCH_SUCCEEDED:

      if (action.globalProperty && action.globalProperty.property) {

        const addedGlobalProperty = {};
        addedGlobalProperty[action.globalProperty.property] = action.globalProperty.value;

        return {
          ...state,
          ...addedGlobalProperty
        };
      }
      else {
        return state;
      }

    case GLOBAL_PROPERTIES_TYPES.CLEAR_CACHE:
      return {};

    default: return state;
  }

};


export const getGlobalProperties = (state) => {
  return state;
};

export const getGlobalProperty = (state, globalPropertyName) => {
  return state[globalPropertyName];
};
