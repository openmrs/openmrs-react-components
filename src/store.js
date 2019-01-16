import { combineReducers } from 'redux';
import { sessionReducers } from './features/session';
import { loginReducers } from './features/login';
import { headerReducers } from './features/header';
import { patientsReducer } from './features/patient';
import { patientSearchReducers } from './features/search';
import { errorsReducers } from './features/errors';
import { formReducers } from './features/form';
import { constantsReducers } from './features/constants';
import { systemReducers } from './features/system';
import { conceptReducer} from "./features/concept/reducers";
import { getPatients, getSelectedPatient, isUpdating, getSelectPatientActionCreators } from './features/patient';
import { getConcept, getConcepts } from './features/concept';
import { locationsReducer, getLocations } from './features/location';
import { patientIdentifierTypesReducer, getPatientIdentifierTypes, getPatientIdentifierType } from './features/patientIdentifierTypes';

export const reducers = combineReducers({
  session: sessionReducers,
  system: systemReducers,
  loginLocations: loginReducers,
  header: headerReducers,
  patients: patientsReducer,
  patientSearch: patientSearchReducers,
  errors: errorsReducers,
  form: formReducers,
  CONSTANTS: constantsReducers,
  metadata: combineReducers({
    concepts: conceptReducer,
    locations: locationsReducer,
    patientIdentifierTypes: patientIdentifierTypesReducer
  })
});

export const selectors = {

  getPatientStore: (state) => {
    return getPatients(state.openmrs.patients);
  },

  getSelectedPatient: (state) => {
    return getSelectedPatient(state.openmrs.patients);
  },

  // deprecated, replaced with "getSelectedPatient" as store is redundant for a selector
  getSelectedPatientFromStore: (state) => {
    return getSelectedPatient(state.openmrs.patients);
  },

  getSelectPatientActionCreators: (state) => {
    return getSelectPatientActionCreators(state.openmrs.patients);
  },

  isPatientStoreUpdating: (state) => {
    return isUpdating(state.openmrs.patients);
  },

  getConcept: (state, conceptUuid) => {
    return getConcept(state.openmrs.metadata.concepts, conceptUuid);
  },

  getConcepts: (state) => {
    return getConcepts(state.openmrs.metadata.concepts);
  },
  
  getPatientIdentifierType: (state, patientIdentifierUuid) => {
    return getPatientIdentifierType(state.openmrs.metadata.patientIdentifierTypes, patientIdentifierUuid);
  },

  getPatientIdentifierTypes: (state) => {
    return getPatientIdentifierTypes(state.openmrs.metadata.patientIdentifierTypes);
  },

  getLocations: (state) => {
    return getLocations(state.openmrs.metadata.locations);
  },

};
