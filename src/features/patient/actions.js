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

// sets the "updating" flag of the patient store to false
const setPatientStoreNotUpdating =() =>  ( {
  type: PATIENT_TYPES.SET_PATIENT_STORE_NOT_UPDATING
} );

// should add patient if they don't exist
const updatePatientInStore = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE
} );

// updates all patient information in the store
// adds any new patients as needed
const updatePatientsInStore = (patients) => ( {
  patients: patients,
  type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE
} );

const setSelectedPatient = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.SET_SELECTED_PATIENT
} );

const clearSelectedPatient = () => ( {
  type: PATIENT_TYPES.CLEAR_SELECTED_PATIENT
} );

// given a set of active visits, update each patient in the store with a matching visit (if found)
// does not modify any other property of a patient besides "visit"
const updateActiveVisitsInStore = (visits) => ( {
  visits: visits,
  type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE
} );

// actions to be triggered when a patient is selected
// (for instance, you may want to trigger fetching additional patient info when patient is marked as selected)
const registerSelectPatientActionCreators = (actionCreators) => ( {
  actionCreators: actionCreators,
  type: PATIENT_TYPES.REGISTER_SELECT_PATIENT_ACTION_CREATORS
});


// calls any action creators registered as "select patient action creators"
const refreshSelectedPatient = () => ({
  type: PATIENT_TYPES.REFRESH_SELECTED_PATIENT
});

export default {
  setPatientStore,
  clearPatientStore,
  setPatientStoreUpdating,
  setPatientStoreNotUpdating,
  updateActiveVisitsInStore,
  updatePatientInStore,
  updatePatientsInStore,
  setSelectedPatient,
  clearSelectedPatient,
  registerSelectPatientActionCreators,
  refreshSelectedPatient
};
