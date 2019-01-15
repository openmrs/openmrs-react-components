import PATIENT_IDENTIFIER_TYPES_TYPES from './types';

export const patientIdentifierTypesReducer = (state = {}, action) => {

  switch (action.type) {

    case PATIENT_IDENTIFIER_TYPES_TYPES.FETCH_SUCCEEDED:
      return action.patientIdentifierTypes;

    case PATIENT_IDENTIFIER_TYPES_TYPES.FAILED:
      return {
        error: {
          message: "Unable to load patientIdentifierTypes"
        }
      };
    default: return state;
  }

};


export const getPatientIdentifiertypes = (state) => {
  return state;
};

export const getPatientIdentifiertype = (state, patientIdentifierTypeUuid) => {
  return state.find(patientIdentifierTypes => patientIdentifierTypes.uuid === patientIdentifierTypeUuid);
};
