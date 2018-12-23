import { conceptReducer } from "../reducers";
import CONCEPT_TYPES from '../types';

describe('patient set reducer', () => {

  const concept = {
    uuid: "some-concept"
  };

  const anotherConcept = {
    uuid: "another-concept"
  };

  const thirdConcept = {
    uuid: "third-concept"
  };

  it('should return the initial state', () => {
    expect(conceptReducer(undefined, {})).toEqual({});
  });

  it('should handle empty results', () => {
    expect(conceptReducer({}, {
      type: CONCEPT_TYPES.FETCH_SUCCEEDED,
      concepts: []
    }))
      .toEqual({});
  });

  it('should add concepts to empty state', () => {
    const concepts = conceptReducer({}, {
      type: CONCEPT_TYPES.FETCH_SUCCEEDED,
      concepts: [
        concept,
        anotherConcept
      ]
    });

    expect(concepts['some-concept']).toEqual(concept);
    expect(concepts['another-concept']).toEqual(anotherConcept);
  });

  it ('should keep existing state if no concepts added', () => {
    const concepts = conceptReducer({
      'some-concept': concept
    }, {
      type: CONCEPT_TYPES.FETCH_SUCCEEDED,
      concepts: []
    });

    expect(concepts['some-concept']).toEqual(concept);
  });

  it('should add concepts to existing state', () => {
    const concepts = conceptReducer({
      'third-concept': thirdConcept
    }, {
      type: CONCEPT_TYPES.FETCH_SUCCEEDED,
      concepts: [
        concept,
        anotherConcept
      ]
    });

    expect(concepts['some-concept']).toEqual(concept);
    expect(concepts['another-concept']).toEqual(anotherConcept);
    expect(concepts['third-concept']).toEqual(thirdConcept);
  });


});
