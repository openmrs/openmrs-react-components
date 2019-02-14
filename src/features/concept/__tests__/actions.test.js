import conceptActions from '../actions';
import CONCEPT_TYPES from '../types';

describe('concept actions', () => {

  const conceptUuids = [
    'some-uuid',
    'another-uuid'
  ];

  const concepts = [
    {
      uuid: 'some-uuid'
    },
    {
      uuid: 'another-uuid'
    }
  ];

  const message = "ERROR";

  it('should create a fetch concepts action', () => {
    const expectedAction = {
      type: CONCEPT_TYPES.FETCH_REQUESTED,
      concepts: conceptUuids
    };

    expect(conceptActions.fetchConcepts(conceptUuids)).toEqual(expectedAction);
  });

  it('should create a fetch succeeded action', () => {
    const expectedAction = {
      type: CONCEPT_TYPES.FETCH_SUCCEEDED,
      concepts: concepts
    };

    expect(conceptActions.fetchConceptsSucceeded(concepts)).toEqual(expectedAction);
  });

  it('should create a fetch failled action', () => {
    const expectedAction = {
      type: CONCEPT_TYPES.FETCH_FAILED,
      message: message
    };

    expect(conceptActions.fetchConceptsFailed(message)).toEqual(expectedAction);
  });

});
