import CONSTANTS_TYPES from "./types";

const initialState = {
  labResultsEncounterType: '',
  labResultsDateConcept: '',
  labResultsDidNotPerformAnswer: '',
  labResultsDidNotPerformQuestion: '',
  labResultsDidNotPerformReason: null,
  labResultsTestOrderNumberConcept: '',
  labResultsTestLocationConcept: {},
  labResultsEstimatedCollectionDateConcept: {},
  dateAndTimeFormat: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsEncounterType: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result encounter type"
        }
      };
      
    case CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsTestOrderNumberConcept: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result test order number concept"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDidNotPerformAnswer: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result did not perform answer"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDidNotPerformQuestion: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result did not perform question"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_CONCEPT.SUCCEEDED:
      const labResultsTestLocationConcept = {
        name: action.payload.display,
        uuid: action.payload.uuid,
        answers: action.payload.answers,
      };
      return Object.assign({}, state, {
        labResultsTestLocationConcept
      });
    
    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_CONCEPT.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result test location concept"
        }
      };
    
    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.SUCCEEDED:
      const labResultsEstimatedCollectionDateConcept = {
        name: action.payload.display,
        uuid: action.payload.uuid,
        answers: action.payload.answers,
      };
      return Object.assign({}, state, {
        labResultsEstimatedCollectionDateConcept
      });

    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result estimated collection date concept"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDidNotPerformReason: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result did not perform reason"
        }
      };

    case CONSTANTS_TYPES.DATE.SUCCEEDED:
      return Object.assign({}, state, {
        dateAndTimeFormat: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.DATE.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load date and time format"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDateConcept: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result date concept"
        }
      };

    default:
      return state;
  }
};
