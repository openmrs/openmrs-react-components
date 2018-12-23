import { call, put, takeLatest, select, all } from "redux-saga/effects";

import CONCEPT_TYPES from "./types";
import conceptActions from "./actions";
import { selectors } from "../../store";
import conceptRest from "../../rest/conceptRest";

function* fetchConcepts(action) {


  // TODO
  // modify ObsHistory or Encounter History or ObsValue to fetch the concept?
  // reducer to clear the store
  // REST endpoint to return multiple concepts
  // clean up types (bigger task)

  // only fetch concepts that aren't already in the store
  const concepts = yield select(selectors.getConcepts);
  const conceptUuids = action.conceptUuids.filter((conceptUuid) => !(conceptUuid in concepts));

  try {

    const results =  yield all(
      conceptUuids.map((conceptUuid) => call(conceptRest.getConcept, conceptUuid))
    );

    yield put(conceptActions.fetchConceptsSucceeded(results));
  }
  catch (e) {
    yield put(conceptActions.fetchConceptsFailed(e.message));
  }

}

function* conceptSagas() {
  yield takeLatest(CONCEPT_TYPES.FETCH_REQUESTED, fetchConcepts);
}

export default conceptSagas;
