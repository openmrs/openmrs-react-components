import patientHeaderReducer from '../reducers';
import PATIENT_HEADER_TYPES from '../types';

const initialState = {
  patient: {
    person: {
      personName: {
        givenName: '',
        familyName: '',
      },
      preferredAddress: {},
    },
    patientIdentifier: {
      identifier: '',
    },
  },
  isLoading: false,
  error: {
    status: false,
    message: null,
  },
};

describe('patientHeaderReducer', () => {
  it(`sets the apprioprate state after PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED is dispatched`, () => {
    const loadingAction = {
      type: PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED,
    };
    const nextState = patientHeaderReducer(initialState, loadingAction);
    expect(nextState.isLoading).toEqual(true);
    expect(nextState.patient).toEqual(initialState.patient);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });

  it(`sets the apprioprate state after PATIENT_HEADER_TYPES.SET_PATIENT.SUCCEEDED is dispatched`, () => {
    const successAction = {
      type: PATIENT_HEADER_TYPES.SET_PATIENT.SUCCEEDED,
      payload: {
        results: ['some valid result'],
      },
    };
    const nextState = patientHeaderReducer(initialState, successAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(successAction.payload);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });

  it(`sets the apprioprate state after PATIENT_HEADER_TYPES.SET_PATIENT.FAILED is dispatched`, () => {
    const failedAction = {
      type: PATIENT_HEADER_TYPES.SET_PATIENT.FAILED,
      error: true,
      payload: 'some error message',
    };
    const nextState = patientHeaderReducer(initialState, failedAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(initialState.patient);
    expect(nextState.error.status).toEqual(failedAction.error);
    expect(nextState.error.message).toEqual(failedAction.payload);
  });

  it(`returns the default state if no action type matches`, () => {
    const someOtherAction = {
      type: 'SOME_OTHER_ACTION',
    };
    const nextState = patientHeaderReducer(initialState, someOtherAction);
    expect(nextState.isLoading).toEqual(false);
    expect(nextState.patient).toEqual(initialState.patient);
    expect(nextState.error.status).toEqual(false);
    expect(nextState.error.message).toEqual(null);
  });
});
