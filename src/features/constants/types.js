import types from 'redux-types';

import { BASIC_TYPES } from "../../types";

export default {
  LAB_RESULTS_ENCOUNTER_TYPE: types('lab_results_encounter_type', BASIC_TYPES),
  LAB_RESULTS_DATE_CONCEPT: types('lab_results_date_concept', BASIC_TYPES),
  LAB_RESULTS_DID_NOT_PERFORM_QUESTION: types('lab_results_did_not_perform_question', BASIC_TYPES),
  LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER: types('lab_results_did_not_perform_reason_answer', BASIC_TYPES),
  LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION: types('lab_results_did_not_perform_reason_question', BASIC_TYPES),
  LAB_RESULTS_DID_NOT_PERFORM_ANSWER: types('lab_results_did_not_perform_answer', BASIC_TYPES),
  LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT: types('lab_results_test_order_number_concept', BASIC_TYPES),
  LAB_RESULTS_TEST_LOCATION_ANSWER: types('lab_results_test_location_answer', BASIC_TYPES),
  LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER: types('lab_results_estimated_collection_date_answer', BASIC_TYPES),
  LAB_RESULTS_TEST_LOCATION_QUESTION: types('lab_results_test_location_question', BASIC_TYPES),
  LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION: types('lab_results_estimated_collection_date_question', BASIC_TYPES),
  LAB_RESULTS_TEST_ORDER_TYPE: types('lab_results_test_order_type', BASIC_TYPES),
  DATE: types('date', BASIC_TYPES)
};
