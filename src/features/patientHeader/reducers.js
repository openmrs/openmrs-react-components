import PATIENT_HEADER_TYPES from "./types";

const initialState = {
  patient: {
    person: {
      personName: {
        givenName: '',
        familyName: '',
      },
      preferredAddress: {},
    },
    patientIdentifier: {
      identifier: '',
    },
  },
  isLoading: false,
  error: {
    status: false,
    message: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_HEADER_TYPES.SET_PATIENT.SUCCEEDED:
      return {
        ...state,
        patient: action.payload,
      };
    case PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case PATIENT_HEADER_TYPES.SET_PATIENT.FAILED:
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload,
          status: action.error,
        },
      };
    default: return state;
  }
};
