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

function* labResultsDidNotPerformReason() {
  try {

    let response = yield call(constantsRest.fetchLabResultsDidNotPerformReason);
    if (response.results.length > 0 ) {
      yield put(constantsActions.fetchLabResultsDidNotPerformReasonSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsDidNotPerformReasonFailed(e.message));
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

function* LabResultsTestLocationConcept(action) {
  try {

    let response = yield call(constantsRest.fetchLabResultsTestLocationConcept, action.conceptUuid);
    if (response.uuid) {
      yield put(constantsActions.fetchLabResultsTestLocationConceptSucceeded(response));
    }

  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsTestOrderNumberConceptFailed(e.message));
  }
}

function* LabResultsEstimatedCollectedDateConcept(action) {
  try {
    let response = yield call(constantsRest.fetchLabResultsEstimatedCollectionDateConcept, action.conceptUuid);
    if (response.uuid) {
      yield put(constantsActions.fetchLabResultsEstimatedCollectionDateConceptSucceeded(response));
    }
    
  }
  catch (e) {
    yield put(constantsActions.fetchLabResultsEstimatedCollectionDateConceptFailed(e.message));
  }
}

function* constantsSagas() {
  yield takeLatest(CONSTANTS_TYPES.DATE.REQUESTED, dateAndTimeFormat);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_REASON.REQUESTED, labResultsDidNotPerformReason);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_QUESTION.REQUESTED, labResultsDidNotPerformQuestion);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DID_NOT_PERFORM_ANSWER.REQUESTED, labResultsDidNotPerformAnswer);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_ENCOUNTER_TYPE.REQUESTED, labResultsEncounterType);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_ORDER_NUMBER_CONCEPT.REQUESTED, LabResultsTestOrderNumberConcept);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_DATE_CONCEPT.REQUESTED, LabResultsDateConcept);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_TEST_LOCATION_CONCEPT.REQUESTED, LabResultsTestLocationConcept);
  yield takeLatest(CONSTANTS_TYPES.LAB_RESULTS_ESTIMATED_COLLECTION_DATE_CONCEPT.REQUESTED, LabResultsEstimatedCollectedDateConcept);
}

export default constantsSagas;
