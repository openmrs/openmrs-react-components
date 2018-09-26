import { mapObjIndexed } from 'ramda';
import patientUtil from '../../domain/patient/patientUtil';
import PATIENT_TYPES from './types';

export const patientsReducer = (state = {}, action) => {

  switch (action.type) {

    case PATIENT_TYPES.SET_PATIENT_STORE:

      if (action.patients == null) {
        return {};
      }
      else {
        return action.patients.reduce((acc, patient) => {
          acc[patient.uuid] = patientUtil.createFromRestRep(patient);
          return acc;
        }, {});
      }

    // adds a patient to the list, if necessary
    case PATIENT_TYPES.ADD_PATIENT_TO_STORE:

      // if the patient already in the list, do nothing
      if (!action.patient || action.patient.uuid in state) {
        return state;
      }
      else {
        return {
          [action.patient.uuid]: patientUtil.createFromRestRep(action.patient),
          ...state
        };
      }

    case PATIENT_TYPES.UPDATE_PATIENT_IN_STORE:
      return {
        ...state,
        [action.patient.uuid]: patientUtil.createFromRestRep(action.patient)
      };

    case PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE:

      // TODO do we want to strip out patient information from visit to avoid duplication?

      // update the visits on all patients in the store
      const currentPatientsWithUpdatedVisits = mapObjIndexed((patient) => {
        return {
          ...patient,
          visit: action.visits != null ? action.visits.find((v) => {
            return patient.uuid === v.patient.uuid;
          }) : undefined
        };
      }, state);

      // add in any missing patients that have active visits but aren't in expected list
      if (action.visits != null) {
        return action.visits.filter((visit) => {
          return !(visit.patient.uuid in currentPatientsWithUpdatedVisits);
        }).reduce((acc, visit) => {
          acc[visit.patient.uuid] =
            patientUtil.createFromRestRep(visit.patient, visit);
          return acc;
        }, currentPatientsWithUpdatedVisits);
      }
      else {
        return currentPatientsWithUpdatedVisits;
      }

    default: return state;
  }
};


export const patientSelectedReducer = (state = null, action) => {
  switch (action.type) {
    case PATIENT_TYPES.SET_SELECTED_PATIENT:
      return action.patient ? action.patient.uuid : null;
    case PATIENT_TYPES.CLEAR_SELECTED_PATIENT:
      return null;
    default: return state;
  }
}
