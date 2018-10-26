import { combineReducers } from "redux";
import { sessionReducers } from "./features/session";
import { loginReducers } from "./features/login";
import { headerReducers } from "./features/header";
import { patientsReducer } from "./features/patient";
import { patientSearchReducers } from "./features/search";
import { errorsReducers } from "./features/errors";
import { formReducers } from "./features/form";
import { constantsReducers } from "./features/constants";
import { getPatients, getSelectedPatient, isUpdating } from "./features/patient";

const PATIENTS = "patients";

export const reducers = combineReducers({
  session: sessionReducers,
  loginLocations: loginReducers,
  header: headerReducers,
  patients: patientsReducer,
  patientSearch: patientSearchReducers,
  errors: errorsReducers,
  form: formReducers,
  CONSTANTS: constantsReducers
});

export const selectors = {

  getPatientStore: (store) => {
    return getPatients(store.openmrs[PATIENTS]);
  },

  getSelectedPatientFromStore: (store) => {
    return getSelectedPatient(store.openmrs[PATIENTS]);
  },

  isPatientStoreUpdating: (store) => {
    return isUpdating(store.openmrs[PATIENTS]);
  }
};
