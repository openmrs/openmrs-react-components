import CONCEPT_TYPES from './types';

export const conceptReducer = (state = {}, action) => {

  switch (action.type) {

    case CONCEPT_TYPES.FETCH_SUCCEEDED:

      if (action.concepts && action.concepts.length > 0) {
        const addedConcepts =
          action.concepts.reduce((acc, concept) => {
            acc[concept.uuid] = {
              _openmrsClass: 'Concept',
              ...concept
            };
            return acc;
          }, {});

        return {
          ...state,
          ...addedConcepts
        };

      }
      else {
        return state;
      }

    default: return state;
  }

};


export const getConcepts = (state) => {
  return state;
};

export const getConcept = (state, conceptUuid) => {
  return state[conceptUuid];
};
