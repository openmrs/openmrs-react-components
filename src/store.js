import { combineReducers } from "redux";
import { sessionReducers } from "./features/session";
import { loginReducers } from "./features/login";
import { headerReducers } from "./features/header";
import { patientsReducer } from "./features/patient";
import { patientSearchReducers } from "./features/search";
import { errorsReducers } from "./features/errors";
import { formReducers } from "./features/form";
import { constantsReducers } from "./features/constants";
import { systemReducers } from './features/system';
import { getPatients, getSelectedPatient, isUpdating } from "./features/patient";

const PATIENTS = "patients";

export const reducers = combineReducers({
  session: sessionReducers,
  system: systemReducers,
  loginLocations: loginReducers,
  header: headerReducers,
  patients: patientsReducer,
  patientSearch: patientSearchReducers,
  errors: errorsReducers,
  form: formReducers,
  CONSTANTS: constantsReducers
});

export const selectors = {

  getPatientStore: (state) => {
    return getPatients(state.openmrs[PATIENTS]);
  },

  getSelectedPatientFromStore: (state) => {
    return getSelectedPatient(state.openmrs[PATIENTS]);
  },

  isPatientStoreUpdating: (state) => {
    return isUpdating(state.openmrs[PATIENTS]);
  }
};
