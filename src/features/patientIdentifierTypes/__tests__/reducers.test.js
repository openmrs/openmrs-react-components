import { patientIdentifierTypesReducer } from "../reducers";
import PATIENT_IDENTIFIER_TYPES_TYPES from '../types';

describe('patientIdentifierTypes Reducer', () => {
  it('should return the initial state', () => {
    expect(patientIdentifierTypesReducer({}, {})).toEqual({});
  });

  it ('should handle patientIdentifierTypes fail', () => {
    const patientIdentifierTypes = patientIdentifierTypesReducer({
    }, {
      type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_FAILED,
    });
    expect(patientIdentifierTypes.error.message).toEqual('Unable to load patientIdentifierTypes');
  });

  it('should add patientIdentifierTypes to the state', () => {
    const mockPatientIdentifierTypes = {uuid: '1', display: 'mock-display1 '}
    const anothermockPatientIdentifierTypes = {uuid: '2', display: 'mock-display2'}
    const patientIdentifierTypes = patientIdentifierTypesReducer({
    }, {
      type: PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_SUCCEEDED,
      patientIdentifierTypes: [
        mockPatientIdentifierTypes,
        anothermockPatientIdentifierTypes
      ]
    });
    expect(patientIdentifierTypes[0]).toEqual(mockPatientIdentifierTypes);
    expect(patientIdentifierTypes[1]).toEqual(anothermockPatientIdentifierTypes);
  });
});
