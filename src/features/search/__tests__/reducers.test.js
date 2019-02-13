import reducers, { initialState } from '../reducers';
import PATIENT_SEARCH_TYPES from '../types';

describe('patient search reducers', () => {

  it('should return the initial state', () => {
    expect(reducers(initialState, {})).toEqual(initialState);
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

    expect(reducers(initialState, {
      type: PATIENT_SEARCH_TYPES.SUCCEEDED,
      results: results
    })).toEqual({
      ...initialState,
      results: results,
      isUpdating: false
    });

  });

  it('should return error message if patient search fails', () => {

    expect(reducers(undefined, {
      type: PATIENT_SEARCH_TYPES.FAILED
    })).toEqual({
      error: {
        message: "Unable to find patients"
      },
      isUpdating: false
    });

  });

  it('should clear patient search results', () => {

    expect(reducers(
      { results: [
        {
          "uuid": "some_uuid"
        },
        {
          "uuid": "another_uuid"
        }
      ] }, {
        type: PATIENT_SEARCH_TYPES.CLEAR_SEARCH
      })).toEqual({ isUpdating: false });

  });

});
