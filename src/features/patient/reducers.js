import { mapObjIndexed } from 'ramda';
import patientUtil from '../../domain/patient/patientUtil';
import PATIENT_TYPES from './types';

export const patientsReducer = (state = {
  set: {},
  isUpdating: false,
  selected: null
}, action) => {

  switch (action.type) {

    case PATIENT_TYPES.SET_PATIENT_STORE:

      if (action.patients === null) {
        return {
          set: null,
          isUpdating: false,
          selected: state.selected
        };
      }
      else {
        const set =
          !action.patients ? {} :
            action.patients.reduce((acc, patient) => {
              acc[patient.uuid] = patientUtil.createFromRestRep(patient);
              return acc;
            }, {});

        return {
          set: set,
          isUpdating: false,
          selected: state.selected
        };
      }

    case PATIENT_TYPES.CLEAR_PATIENT_STORE:

      return {
        set: {},
        isUpdating: false,
        selected: null
      };

    // adds a patient to the list, if necessary
    case PATIENT_TYPES.ADD_PATIENT_TO_STORE:

      // if the patient already in the list, do nothing
      if (!action.patient || action.patient.uuid in state.set) {
        return {
          set: state.set,
          selected: state.selected,
          isUpdating: false
        };
      }
      else {
        return {
          set: {
            [action.patient.uuid]: patientUtil.createFromRestRep(action.patient),
            ...state.set
          },
          selected: state.selected,
          isUpdating: false
        };
      }

    case PATIENT_TYPES.UPDATE_PATIENT_IN_STORE:
      return {
        set: {
          ...state.set,
          [action.patient.uuid]: patientUtil.createFromRestRep(action.patient)
        },
        selected: state.selected,
        isUpdating: false
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
      }, state.set);

      // add in any missing patients that have active visits but aren't in expected list
      if (action.visits != null) {
        const set = action.visits.filter((visit) => {
          return !(visit.patient.uuid in currentPatientsWithUpdatedVisits);
        }).reduce((acc, visit) => {
          acc[visit.patient.uuid] =
            patientUtil.createFromRestRep(visit.patient, visit);
          return acc;
        }, currentPatientsWithUpdatedVisits);

        return {
          set: set,
          selected: state.selected,
          isUpdating: false
        };
      }
      else {
        return {
          set: currentPatientsWithUpdatedVisits,
          selected: state.selected,
          isUpdating: false
        };
      }

    case PATIENT_TYPES.SET_SELECTED_PATIENT:
      return {
        set: state.set,
        selected: action.patient ? action.patient.uuid : null,
        isUpdating: state.isUpdating
      };

    case PATIENT_TYPES.CLEAR_SELECTED_PATIENT:
      return {
        set: state.set,
        selected: null,
        isUpdating: state.isUpdating
      };

    case PATIENT_TYPES.SET_PATIENT_STORE_UPDATING:
      return {
        set: state.set,
        selected: state.selected,
        isUpdating: true
      };

    default: return state;
  }
};

export const getPatients = (store) => {
  return store.set;
};

export const isUpdating = (store) => {
  return store.isUpdating;
};

export const getSelectedPatient = (store) => {
  return (store.set && store.selected) ? store.set[store.selected] : null;
};

