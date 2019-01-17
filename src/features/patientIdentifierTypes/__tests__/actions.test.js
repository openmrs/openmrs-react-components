import patientIdentifierTypesActions from '../actions';
import PATIENT_IDENTIFIER_TYPES_TYPES from '../types';

describe('patientIdentifierTypeAction actions', () => {
  const patientIdentifierTypes = {
    results: [
      {
        uuid: 'some-uuid'
      },
      {
        uuid: 'another-uuid'
      }
    ] 
  };

  const message = "ERROR";

  it('should create a fetch concepts action', () => {
    const expectedAction = {
      type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_REQUESTED,
    };

    expect(patientIdentifierTypesActions.fetchPatientIdentifierTypes()).toEqual(expectedAction);
  });

  it('should create a fetch succeeded action', () => {
    const expectedAction = {
      type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_SUCCEEDED,
      patientIdentifierTypes: patientIdentifierTypes.results
    };

    expect(patientIdentifierTypesActions.fetchPatientIdentifierTypesSucceeded(patientIdentifierTypes)).toEqual(expectedAction);
  });

  it('should create a fetch failled action', () => {
    const expectedAction = {
      type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_FAILED,
      message: message
    };

    expect(patientIdentifierTypesActions.fetchPatientIdentifierTypesFailed(message)).toEqual(expectedAction);
  });

});
