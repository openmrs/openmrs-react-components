import { call, put, takeLatest } from 'redux-saga/effects';
import constantsRest from '../../rest/constantsRest';
import CONSTANTS_TYPES from './types';
import constantsActions from './actions';

function* dateAndTimeFormat() {
  try {
    
    let response = yield call(constantsRest.getDateFormat);
    if (response.results.length > 0 ) {
      yield put(constantsActions.getDateAndTimeFormatSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.getDateAndTimeFormatFailed(e.message));
  }
}

function* labResultsDidNotPerformReasonQuestion() {
  try {

    let response = yield call(constantsRest.fetchLabResultsDidNotPerformReasonQuestion);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsDidNotPerformReasonQuestionSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDidNotPerformReasonQuestionFailed(e.message));
  }
}

function* labResultsDidNotPerformReasonAnswer(action) {
  try {

    let response = yield call(constantsRest.fetchLabResultsDidNotPerformReasonAnswer, action.conceptUuid);
    if (response.answers ) {
      yield put(constantsActions.fetchLabResultsDidNotPerformReasonAnswerSucceeded(response.answers));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDidNotPerformReasonAnswerFailed(e.message));
  }
}

function* labResultsDidNotPerformQuestion() {
  try {

    let response = yield call(constantsRest.fetchLabResultsDidNotPerformQuestion);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsDidNotPerformQuestionSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDidNotPerformQuestionFailed(e.message));
  }
}

function* labResultsDidNotPerformAnswer() {
  try {

    let response = yield call(constantsRest.fetchLabResultsDidNotPerformAnswer);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsDidNotPerformAnswerSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDidNotPerformAnswerFailed(e.message));
  }
}

function* labResultsEncounterType() {
  try {

    let response = yield call(constantsRest.fetchLabResultsEncounterType);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsEncounterTypeSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsEncounterTypeFailed(e.message));
  }
}

function* labResultsTestOrderType() {
  try {

    let response = yield call(constantsRest.fetchLabResultsTestOrderType);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsTestOrderTypeSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsTestOrderTypeFailed(e.message));
  }
}

function* LabResultsTestOrderNumberConcept() {
  try {

    let response = yield call(constantsRest.fetchLabResultsTestOrderNumberConcept);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsTestOrderNumberConceptSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsTestOrderNumberConceptFailed(e.message));
  }
}

function* LabResultsDateConcept() {
  try {

    let response = yield call(constantsRest.fetchLabResultsDateConcept);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsDateConceptSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDateConceptFailed(e.message));
  }
}

function* LabResultsTestLocationQuestion() {
  try {

    let response = yield call(constantsRest.fetchLabResultsTestLocationQuestion);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsTestLocationQuestionSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsTestOrderNumberQuestionFailed(e.message));
  }
}

function* LabResultsTestLocationAnswer(action) {
  try {
    
    let response = yield call(constantsRest.fetchLabResultsTestLocationAnswer, action.conceptUuid);
    if (response.answers) {
      yield put(constantsActions.fetchLabResultsTestLocationAnswerSucceeded(response.answers));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsTestOrderNumberAnswerFailed(e.message));
  }
}

function* LabResultsEstimatedCollectedDateQuestion() {
  try {
    let response = yield call(constantsRest.fetchLabResultsEstimatedCollectionDateQuestion);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsEstimatedCollectionDateQuestionSucceeded(response));
    }
    
  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsEstimatedCollectionDateQuestionFailed(e.message));
  }
}

function* LabResultsEstimatedCollectedDateAnswer() {
  try {
    let response = yield call(constantsRest.fetchLabResultsEstimatedCollectionDateAnswer);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsEstimatedCollectionDateAnswerSucceeded(response));
    }
    
  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsEstimatedCollectionDateAnswerFailed(e.message));
  }
}

function* constantsSagas() {
  yield takeLatest(CONSTANTS_TYPES.DATE.REQUESTED, dateAndTimeFormat);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_QUESTION.REQUESTED, labResultsDidNotPerformReasonQuestion);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON_ANSWER.REQUESTED, labResultsDidNotPerformReasonAnswer);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.REQUESTED, labResultsDidNotPerformQuestion);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.REQUESTED, labResultsDidNotPerformAnswer);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.REQUESTED, labResultsEncounterType);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.REQUESTED, LabResultsTestOrderNumberConcept);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.REQUESTED, LabResultsDateConcept);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_QUESTION.REQUESTED, LabResultsTestLocationQuestion);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_ANSWER.REQUESTED, LabResultsTestLocationAnswer);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_QUESTION.REQUESTED, LabResultsEstimatedCollectedDateQuestion);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_ANSWER.REQUESTED, LabResultsEstimatedCollectedDateAnswer);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_TYPE.REQUESTED, labResultsTestOrderType);
}

export default constantsSagas;
