import configureMockStore from 'redux-mock-store';
import patientHeaderActions from '../actions';
import PATIENT_HEADER_TYPES from '../types';

const mockStore = configureMockStore();
const store = mockStore();

describe('Patient actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  it('should request for patient data', () => {
    const expectedActions = [{
      type: PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED,
      payload: {
        patientUuid: 'mockPatientUuid',
      },
    }];
    store.dispatch(patientHeaderActions.getPatient('mockPatientUuid'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set patient data in the store', () => {
    const expectedActions = [{
      type: PATIENT_HEADER_TYPES.SET_PATIENT.SUCCEEDED,
      payload: 'mockPatientRecord',
    }];
    store.dispatch(patientHeaderActions.getPatientSucceeded('mockPatientRecord'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should set error messgage to store if fetching patient data fails', () => {
    const expectedActions = [{
      type: PATIENT_HEADER_TYPES.SET_PATIENT.FAILED,
      error: {
        message: 'mockErrorMessage',
      },
    }];
    store.dispatch(patientHeaderActions.getPatientFailed('mockErrorMessage'));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
});
