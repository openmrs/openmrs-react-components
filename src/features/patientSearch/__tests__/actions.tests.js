import patientSearchActions from '../actions';
import PATIENT_SEARCH_TYPES from '../types';

describe('visit actions', () => {

  it('should create a patient search action', () => {

    const expectedAction = {
      type: PATIENT_SEARCH_TYPES.REQUESTED,
      query: "some_query",
      parseResults: parseResultsMock,
      representation: "some_representation"
    };

    expect(patientSearchActions.patientSearch("some_query", null, "some_representation")).toEqual(expectedAction);

  });

  it('should create a patient search succeeded action', () => {

    const results = [
      {
        uuid: "some_uuid"
      }
    ];

    const expectedAction = {
      type: PATIENT_SEARCH_TYPES.SUCCEEDED,
      results: results
    };

    expect(patientSearchActions.patientSearchSucceeded(results)).toEqual(expectedAction);

  });

  it('should create a patient search failed action', () => {

    const expectedAction = {
      type: PATIENT_SEARCH_TYPES.FAILED,
      message: "some_message"
    };

    expect(patientSearchActions.patientSearchFailed("some_message")).toEqual(expectedAction);
  });
});
