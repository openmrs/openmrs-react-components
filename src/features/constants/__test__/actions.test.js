import constantAction from '../actions';
import CONSTANT_TYPE from '../types';

describe('constant actions', () => {
  const mockUuid = '1234';
  
  describe('LAB_RESULTS_ENCOUNTER_TYPE actions', () => {
    it('should dispatch action for LAB_RESULTS_ENCOUNTER_TYPE SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_ENCOUNTER_TYPE.SUCCEEDED };
      expect(constantAction.fetchLabResultsEncounterTypeSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ENCOUNTER_TYPE FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_ENCOUNTER_TYPE.FAILED };
      expect(constantAction.fetchLabResultsEncounterTypeFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ENCOUNTER_TYPE REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_ENCOUNTER_TYPE.REQUESTED };
      expect(constantAction.fetchLabResultsEncounterType(mockUuid)).toEqual(expectedAction);
    });
  });
  
  describe('LAB_RESULTS_DATE_CONCEPT actions', () => {
    it('should dispatch action for LAB_RESULTS_DATE_CONCEPT SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DATE_CONCEPT.SUCCEEDED };
      expect(constantAction.fetchLabResultsDateConceptSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DATE_CONCEPT FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_DATE_CONCEPT.FAILED };
      expect(constantAction.fetchLabResultsDateConceptFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DATE_CONCEPT REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_DATE_CONCEPT.REQUESTED };
      expect(constantAction.fetchLabResultsDateConcept(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_QUESTION actions', () => {
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_QUESTION SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.SUCCEEDED };
      expect(constantAction.fetchLabResultsDidNotPerformQuestionSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ENCOUNTER_TYPE FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.FAILED };
      expect(constantAction.fetchLabResultsDidNotPerformQuestionFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ENCOUNTER_TYPE REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.REQUESTED };
      expect(constantAction.fetchLabResultsDidNotPerformQuestion(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER actions', () => {
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.SUCCEEDED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonAnswerSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.FAILED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonAnswerFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER REQUESTED', () => {
      const expectedAction = { "conceptUuid": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.REQUESTED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonAnswer(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION actions', () => {
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.SUCCEEDED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonQuestionSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.FAILED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonQuestionFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.REQUESTED };
      expect(constantAction.fetchLabResultsDidNotPerformReasonQuestion(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_ANSWER actions', () => {
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_ANSWER SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.SUCCEEDED };
      expect(constantAction.fetchLabResultsDidNotPerformAnswerSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_ANSWER FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.FAILED };
      expect(constantAction.fetchLabResultsDidNotPerformAnswerFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_DID_NOT_PERFORM_ANSWER REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.REQUESTED };
      expect(constantAction.fetchLabResultsDidNotPerformAnswer(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT actions', () => {
    it('should dispatch action for LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.SUCCEEDED };
      expect(constantAction.fetchLabResultsTestOrderNumberConceptSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.FAILED };
      expect(constantAction.fetchLabResultsTestOrderNumberConceptFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.REQUESTED };
      expect(constantAction.fetchLabResultsTestOrderNumberConcept(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_TEST_LOCATION_ANSWER actions', () => {
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_ANSWER SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_ANSWER.SUCCEEDED };
      expect(constantAction.fetchLabResultsTestLocationAnswerSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_ANSWER FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_ANSWER.FAILED };
      expect(constantAction.fetchLabResultsTestLocationAnswerFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_ANSWER REQUESTED', () => {
      const expectedAction = { "conceptUuid": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_ANSWER.REQUESTED };
      expect(constantAction.fetchLabResultsTestLocationAnswer(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER actions', () => {
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.SUCCEEDED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateAnswerSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.FAILED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateAnswerFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.REQUESTED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateAnswer(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_TEST_LOCATION_QUESTION actions', () => {
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_QUESTION SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_QUESTION.SUCCEEDED };
      expect(constantAction.fetchLabResultsTestLocationQuestionSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_QUESTION FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_QUESTION.FAILED };
      expect(constantAction.fetchLabResultsTestLocationQuestionFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_TEST_LOCATION_QUESTION REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_QUESTION.REQUESTED };
      expect(constantAction.fetchLabResultsTestLocationQuestion(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION actions', () => {
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.SUCCEEDED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateQuestionSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.FAILED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateQuestionFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.REQUESTED };
      expect(constantAction.fetchLabResultsEstimatedCollectionDateQuestion(mockUuid)).toEqual(expectedAction);
    });
  });

  describe('DATE actions', () => {
    it('should dispatch action for DATE SUCCESS', () => {
      const expectedAction = { "payload": mockUuid, "type": CONSTANT_TYPE.DATE.SUCCEEDED };
      expect(constantAction.getDateAndTimeFormatSucceeded(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for DATE FAILED', () => {
      const expectedAction = { "error": { "message": mockUuid }, "type": CONSTANT_TYPE.DATE.FAILED };
      expect(constantAction.getDateAndTimeFormatFailed(mockUuid)).toEqual(expectedAction);
    });
    it('should dispatch action for DATE REQUESTED', () => {
      const expectedAction = { "type": CONSTANT_TYPE.DATE.REQUESTED };
      expect(constantAction.getDateAndTimeFormat(mockUuid)).toEqual(expectedAction);
    });
  });

});
