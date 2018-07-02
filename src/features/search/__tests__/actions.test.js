import patientSearchActions from '../actions';
import PATIENT_SEARCH_TYPES from '../types';

describe('patient search actions', () => {

  const parseResultsMock = jest.fn();

  it('should create a patient search action', () => {

    const expectedAction = {
      type: PATIENT_SEARCH_TYPES.REQUESTED,
      query: "some_query",
      parseResults: parseResultsMock,
      representation: "some_representation"
    };

    expect(patientSearchActions.patientSearch("some_query", parseResultsMock, "some_representation")).toEqual(expectedAction);

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

  it('should create a clear patient search action', () => {

    const expectedAction = {
      type: PATIENT_SEARCH_TYPES.CLEAR_SEARCH
    };

    expect(patientSearchActions.clearPatientSearch()).toEqual(expectedAction);
  });

});
