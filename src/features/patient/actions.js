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

// throws the error flag on the patient store
const setPatientStoreError = () => ( {
  type: PATIENT_TYPES.SET_PATIENT_STORE_ERROR
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

export default {
  setPatientStore,
  clearPatientStore,
  setPatientStoreUpdating,
  setPatientStoreNotUpdating,
  setPatientStoreError,
  updateActiveVisitsInStore,
  updatePatientInStore,
  updatePatientsInStore,
  setSelectedPatient,
  clearSelectedPatient
};
