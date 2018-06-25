import reducers from '../reducers';
import PATIENT_SEARCH_TYPES from '../types';

describe('patient search reducers', () => {

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({});
  });

  it('should return patient search results', () => {

    const results =  [
      {
        "uuid": "some_uuid"
      },
      {
        "uuid": "another_uuid"
      }
    ];

    expect(reducers(undefined, {
      type: PATIENT_SEARCH_TYPES.SUCCEEDED,
      results: results
    })).toEqual({
      results: results
    });

  });

  it('should return error message if patient search fails', () => {

    expect(reducers(undefined, {
      type: PATIENT_SEARCH_TYPES.FAILED
    })).toEqual({
      error: {
        message: "Unable to find patients"
      }
    });

  });

});
