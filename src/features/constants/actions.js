import CONSTANTS_TYPES from "./types";

const fetchLabResultsEncounterType = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.REQUESTED,
} );

const fetchLabResultsEncounterTypeSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.SUCCEEDED,
  payload
} );

const fetchLabResultsEncounterTypeFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsDateConcept = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.REQUESTED,
} );

const fetchLabResultsDateConceptSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.SUCCEEDED,
  payload
} );

const fetchLabResultsDateConceptFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsDidNotPerformQuestion = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.REQUESTED,
} );

const fetchLabResultsDidNotPerformQuestionSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.SUCCEEDED,
  payload
} );

const fetchLabResultsDidNotPerformQuestionFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsDidNotPerformReason = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.REQUESTED,
} );

const fetchLabResultsDidNotPerformReasonSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.SUCCEEDED,
  payload
} );

const fetchLabResultsDidNotPerformReasonFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsDidNotPerformAnswer = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.REQUESTED,
} );

const fetchLabResultsDidNotPerformAnswerSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.SUCCEEDED,
  payload
} );

const fetchLabResultsDidNotPerformAnswerFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsTestOrderNumberConcept = () => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.REQUESTED,
} );

const fetchLabResultsTestOrderNumberConceptSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.SUCCEEDED,
  payload
} );

const fetchLabResultsTestOrderNumberConceptFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsTestLocationConcept = (conceptUuid) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_CONCEPT.REQUESTED,
  conceptUuid
} );

const fetchLabResultsTestLocationConceptSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_CONCEPT.SUCCEEDED,
  payload
} );

const fetchLabResultsTestLocationConceptFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULT_TEST_LOCATION_CONCEPT.FAILED,
  error: {
    message: message
  }
} );

const fetchLabResultsEstimatedCollectionDateConcept = (conceptUuid) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.REQUESTED,
  conceptUuid
} );

const fetchLabResultsEstimatedCollectionDateConceptSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.SUCCEEDED,
  payload
} );

const fetchLabResultsEstimatedCollectionDateConceptFailed = (message) => ( {
  type: CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.FAILED,
  error: {
    message: message
  }
} );

const getDateAndTimeFormat = () => ( {
  type: CONSTANTS_TYPES.DATE.REQUESTED,
} );

const getDateAndTimeFormatSucceeded = (payload) => ( {
  type: CONSTANTS_TYPES.DATE.SUCCEEDED,
  payload
} );

const getDateAndTimeFormatFailed = (message) => ( {
  type: CONSTANTS_TYPES.DATE.FAILED,
  error: {
    message: message
  }
} );

export default {
  fetchLabResultsEncounterType,
  fetchLabResultsEncounterTypeSucceeded,
  fetchLabResultsEncounterTypeFailed,
  fetchLabResultsDateConcept,
  fetchLabResultsDateConceptSucceeded,
  fetchLabResultsDateConceptFailed,
  fetchLabResultsDidNotPerformQuestion,
  fetchLabResultsDidNotPerformQuestionSucceeded,
  fetchLabResultsDidNotPerformQuestionFailed,
  fetchLabResultsDidNotPerformReason,
  fetchLabResultsDidNotPerformReasonSucceeded,
  fetchLabResultsDidNotPerformReasonFailed,
  fetchLabResultsDidNotPerformAnswer,
  fetchLabResultsDidNotPerformAnswerSucceeded,
  fetchLabResultsDidNotPerformAnswerFailed,
  fetchLabResultsTestOrderNumberConcept,
  fetchLabResultsTestOrderNumberConceptSucceeded,
  fetchLabResultsTestOrderNumberConceptFailed,
  fetchLabResultsTestLocationConcept,
  fetchLabResultsTestLocationConceptSucceeded,
  fetchLabResultsTestLocationConceptFailed,
  fetchLabResultsEstimatedCollectionDateConcept,
  fetchLabResultsEstimatedCollectionDateConceptSucceeded,
  fetchLabResultsEstimatedCollectionDateConceptFailed,
  getDateAndTimeFormat,
  getDateAndTimeFormatSucceeded,
  getDateAndTimeFormatFailed,
}
