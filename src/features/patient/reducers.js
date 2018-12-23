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

    case PATIENT_TYPES.UPDATE_PATIENT_IN_STORE:

      // don't overwrite the active visit
      // TODO note that the functionality to keep active visits may be removed in a future release
      let visit = undefined;
      if (state.set[action.patient.uuid]) {
        visit = state.set[action.patient.uuid].visit;
      }

      return {
        set: {
          ...state.set,
          [action.patient.uuid]: {
            ...patientUtil.createFromRestRep(action.patient),
            visit
          }
        },
        selected: state.selected,
        isUpdating: false
      };

    case PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE:

      if (action.patients === null || action.patients.length === 0) {
        return {
          set: state.set,
          isUpdating: false,
          selected: state.selected
        };
      }
      else {
        const set =
          !action.patients ? {} :
            action.patients.reduce((acc, patient) => {

              // don't overwrite the active visit
              // TODO note that the functionality to keep active visits may be removed in a future release
              let visit = undefined;
              if (state.set[patient.uuid]) {
                visit = state.set[patient.uuid].visit;
              }

              acc[patient.uuid] = {
                ...patientUtil.createFromRestRep(patient),
                visit
              };

              return acc;
            }, {});

        return {
          set: {
            ...state.set,
            ...set
          },
          isUpdating: false,
          selected: state.selected
        };
      }


    case PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE:

      // update the visits on all patients in the store
      // note that patients that are not already in the store are ignored
      const currentPatientsWithUpdatedVisits = mapObjIndexed((patient) => {
        return {
          ...patient,
          visit: action.visits != null ? action.visits.find((v) => {
            return patient.uuid === v.patient.uuid;
          }) : undefined
        };
      }, state.set);

      return {
        set: currentPatientsWithUpdatedVisits,
        selected: state.selected,
        isUpdating: false
      };

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

export const getPatients = (state) => {
  return state.set;
};

export const isUpdating = (state) => {
  return state.isUpdating;
};

export const getSelectedPatient = (state) => {
  return (state.set && state.selected) ? state.set[state.selected] : null;
};

