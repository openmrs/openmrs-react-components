import PATIENT_TYPES from "./types";

// given a list of patients, sets the store with these patients
const setPatientStore = (patients) => ( {
  patients: patients,
  type: PATIENT_TYPES.SET_PATIENT_STORE
} );

const clearPatientStore = () =>  ( {
  type: PATIENT_TYPES.CLEAR_PATIENT_STORE
} );

// sets the "updating" flag of the patient store to true
const setPatientStoreUpdating =() =>  ( {
  type: PATIENT_TYPES.SET_PATIENT_STORE_UPDATING
} );

const updateActiveVisitsInStore = (visits) => ( {
  visits: visits,
  type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE
} );

const addPatientToStore = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.ADD_PATIENT_TO_STORE
} );

const updatePatientInStore = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE
} );

const setSelectedPatient = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.SET_SELECTED_PATIENT
} );

const clearSelectedPatient = () => ( {
  type: PATIENT_TYPES.CLEAR_SELECTED_PATIENT
} );

export default {
  setPatientStore,
  clearPatientStore,
  setPatientStoreUpdating,
  updateActiveVisitsInStore,
  addPatientToStore,
  updatePatientInStore,
  setSelectedPatient,
  clearSelectedPatient
};
