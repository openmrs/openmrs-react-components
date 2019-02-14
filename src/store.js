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
import { conceptReducer } from "./features/concept/reducers";
import { getPatients, getSelectedPatient, isUpdating } from './features/patient';
import { getConcept, getConcepts } from './features/concept';
import { locationsReducer, getLocations, getLocation } from './features/location';
import { getSessionLocation } from "./features/session";
import { patientIdentifierTypesReducer, getPatientIdentifierTypes, getPatientIdentifierType, getPatientIdentifierTypeByName } from './features/patientIdentifierTypes';

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

  isPatientStoreUpdating: (state) => {
    return isUpdating(state.openmrs.patients);
  },

  getConcept: (state, conceptUuid) => {
    return getConcept(state.openmrs.metadata.concepts, conceptUuid);
  },

  getConcepts: (state) => {
    return getConcepts(state.openmrs.metadata.concepts);
  },
  
  getPatientIdentifierType: (state, patientIdentifierTypeUuid) => {
    return getPatientIdentifierType(state.openmrs.metadata.patientIdentifierTypes, patientIdentifierTypeUuid);
  },

  getPatientIdentifierTypeByName: (state, patientIdentifierTypeName) => {
    return getPatientIdentifierTypeByName(state.openmrs.metadata.patientIdentifierTypes, patientIdentifierTypeName);
  },

  getPatientIdentifierTypes: (state) => {
    return getPatientIdentifierTypes(state.openmrs.metadata.patientIdentifierTypes);
  },

  getLocations: (state) => {
    return getLocations(state.openmrs.metadata.locations);
  },

  getSessionLocation: (state) => {
    const sessionLocation = getSessionLocation(state.openmrs.session);
    return sessionLocation && getLocation(state.openmrs.metadata.locations, sessionLocation.uuid)
      ? getLocation(state.openmrs.metadata.locations, sessionLocation.uuid) : sessionLocation;
  }

};
