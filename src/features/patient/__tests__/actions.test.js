import patientActions from '../actions';
import PATIENT_TYPES from '../types';

describe('patient actions', () => {

  const patient = {
    uuid: "abc123"
  };

  const patients = [
    {
      uuid: "abc123"
    },
    {
      uuid: "def456"
    }
  ];

  const activeVisits = [
    {
      patient
    }
  ];

  it('should create set patient store action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: patients
    };
    expect(patientActions.setPatientStore(patients)).toEqual(expectedAction);
  });

  it('should create clear patient store action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.CLEAR_PATIENT_STORE
    };
    expect(patientActions.clearPatientStore()).toEqual(expectedAction);
  });

  it('should create set patient store updating action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.SET_PATIENT_STORE_UPDATING,
    };
    expect(patientActions.setPatientStoreUpdating()).toEqual(expectedAction);
  });

  it('should create update active visits', () => {
    const expectedAction = {
      type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      visits: activeVisits
    };
    expect(patientActions.updateActiveVisitsInStore(activeVisits)).toEqual(expectedAction);
  });

  it('should create update patient in store action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE,
      patient: patient
    };
    expect(patientActions.updatePatientInStore(patient)).toEqual(expectedAction);
  });

  it('should create update patients in store action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: patients
    };
    expect(patientActions.updatePatientsInStore(patients)).toEqual(expectedAction);
  });


  it('should create set selected patient action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.SET_SELECTED_PATIENT,
      patient: patient
    };
    expect(patientActions.setSelectedPatient(patient)).toEqual(expectedAction);
  });

  it('should create clear selected patient action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.CLEAR_SELECTED_PATIENT
    };
    expect(patientActions.clearSelectedPatient()).toEqual(expectedAction);
  });

  it('should create set patient store error action', () => {
    const expectedAction = {
      type: PATIENT_TYPES.SET_PATIENT_STORE_ERROR
    };
    expect(patientActions.setPatientStoreError()).toEqual(expectedAction);
  });

});
