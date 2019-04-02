import CONSTANTS_TYPES from "./types";

// TODO: this all needs to be refactored, see: https://tickets.pih-emr.org/browse/UHM-3796

const initialState = {
  labResultsEncounterType: '',
  labResultsEncounterRole: '',
  labResultsDateConcept: '',
  labResultsDidNotPerformAnswer: '',
  labResultsDidNotPerformQuestion: '',
  labResultsDidNotPerformReasonQuestion: '',
  labResultsDidNotPerformReasonAnswer: {},
  labResultsTestOrderNumberConcept: '',
  labResultsTestLocationQuestion: '',
  labResultsTestOrderType: '',
  labResultsTestLocationAnswer: {},
  labResultsEstimatedCollectionDateQuestion: '',
  labResultsEstimatedCollectionDateAnswer: '',
  dateAndTimeFormat: '',
  testOrderEncounterRole: '',
  testOrderEncounterType: ''
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

    case CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_ROLE.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsEncounterRole: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_ROLE.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result encounter role"
        }
      };

    case CONSTANTS_TYPES.TEST_ORDER_ENCOUNTER_ROLE.SUCCEEDED:
      return Object.assign({}, state, {
        testOrderEncounterRole: action.payload
      });

    case CONSTANTS_TYPES.TEST_ORDER_ENCOUNTER_ROLE.FAILED:
      return {
        error: {
          message: "Unable to load test order encounter role"
        }
      };

    case CONSTANTS_TYPES.TEST_ORDER_ENCOUNTER_TYPE.SUCCEEDED:
      return Object.assign({}, state, {
        testOrderEncounterType: action.payload
      });

    case CONSTANTS_TYPES.TEST_ORDER_ENCOUNTER_TYPE.FAILED:
      return {
        error: {
          message: "Unable to load test order encounter type"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_TYPE.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsTestOrderType: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_TYPE.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result test order type"
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

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_QUESTION.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsTestLocationQuestion: action.payload.results[0].value
      });
    
    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_QUESTION.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result test location question"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_ANSWER.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsTestLocationAnswer: action.payload
      });
    
    case CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_ANSWER.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result test location answer"
        }
      };
    
    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsEstimatedCollectionDateQuestion: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result estimated collection date question"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsEstimatedCollectionDateAnswer: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result estimated collection date answer"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDidNotPerformReasonQuestion: action.payload.results[0].value
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result did not perform reason question"
        }
      };

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.SUCCEEDED:
      return Object.assign({}, state, {
        labResultsDidNotPerformReasonAnswer: action.payload
      });

    case CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load lab result did not perform reason answer"
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
