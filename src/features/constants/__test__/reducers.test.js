import reducers from '../reducers';
import CONSTANT_TYPE from '../types';

describe('CONSTANTS reducers', () => {

  const initialState = {
    labResultsEncounterType: '',
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
  };
  const mockUuid= '1234';

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState);
  });

  describe('LAB_RESULTS_ENCOUNTER_TYPE', () => {
    it('should handle LAB_RESULTS_ENCOUNTER_TYPE SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ENCOUNTER_TYPE.SUCCEEDED,
        payload
      }).labResultsEncounterType).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_ENCOUNTER_TYPE FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ENCOUNTER_TYPE.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result encounter type');
    });
  });

  describe('LAB_RESULTS_TEST_ORDER_TYPE', () => {
    it('should handle LAB_RESULTS_TEST_ORDER_TYPE SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_TYPE.SUCCEEDED,
        payload
      }).labResultsTestOrderType).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_TEST_ORDER_TYPE FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_TYPE.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result test order type');
    });
  });

  describe('LAB_RESULTS_DATE_CONCEPT', () => {
    it('should handle LAB_RESULTS_DATE_CONCEPT SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DATE_CONCEPT.SUCCEEDED,
        payload
      }).labResultsDateConcept).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_DATE_CONCEPT FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DATE_CONCEPT.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result date concept');
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_QUESTION', () => {
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_QUESTION SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.SUCCEEDED,
        payload
      }).labResultsDidNotPerformQuestion).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_QUESTION FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result did not perform question');
    });
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER', () => {
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER SUCCESS', () => {
      const payload =  mockUuid;
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.SUCCEEDED,
        payload
      }).labResultsDidNotPerformReasonAnswer).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result did not perform reason answer');
    });
  
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION', () => {
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
      
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.SUCCEEDED,
        payload
      }).labResultsDidNotPerformReasonQuestion).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result did not perform reason question');
    });
  
  });

  describe('LAB_RESULTS_DID_NOT_PERFORM_ANSWER', () => {
    it('should handle LAB_RESULTS_DID_NOT_PERFORM_ANSWER SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
          
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.SUCCEEDED,
        payload
      }).labResultsDidNotPerformAnswer).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_DID_NOT_PERFORM_ANSWER FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result did not perform answer');
    });
  
  });
  
  describe('LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT', () => {
    it('should handle LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
              
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.SUCCEEDED,
        payload
      }).labResultsTestOrderNumberConcept).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result test order number concept');
    });
  
  });

  describe('LAB_RESULTS_TEST_LOCATION_ANSWER', () => {
    it('should handle LAB_RESULTS_TEST_LOCATION_ANSWER SUCCESS', () => {
      const payload =  mockUuid;
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_ANSWER.SUCCEEDED,
        payload
      }).labResultsTestLocationAnswer).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_TEST_LOCATION_ANSWER FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_ANSWER.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result test location answer');
    });
  
  });

  describe('LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER', () => {
    it('should handle LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
    
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.SUCCEEDED,
        payload
      }).labResultsEstimatedCollectionDateAnswer).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result estimated collection date answer');
    });
  });

  describe('LAB_RESULTS_TEST_LOCATION_QUESTION', () => {
    it('should handle LAB_RESULTS_TEST_LOCATION_QUESTION SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_QUESTION.SUCCEEDED,
        payload
      }).labResultsTestLocationQuestion).toEqual(mockUuid);
    });

    it('should handle LAB_RESULTS_TEST_LOCATION_QUESTION FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_TEST_LOCATION_QUESTION.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result test location question');
    });
  });

  describe('LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION', () => {
    it('should handle LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.SUCCEEDED,
        payload
      }).labResultsEstimatedCollectionDateQuestion).toEqual(mockUuid);
    });
    it('should handle LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.FETCH_FAILED,
      }).error.message).toEqual('Unable to load lab result estimated collection date question');
    });
  });

  describe('DATE', () => {
    it('should handle DATE SUCCESS', () => {
      const payload =  {
        results: [{
          value: mockUuid
        }]
      };
  
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.DATE.SUCCEEDED,
        payload
      }).dateAndTimeFormat).toEqual(mockUuid);
    });
    it('should handle DATE FETCH_FAILED', () => {
      expect(reducers(undefined, {
        type: CONSTANT_TYPE.DATE.FETCH_FAILED,
      }).error.message).toEqual('Unable to load date and time format');
    });
  });

});
