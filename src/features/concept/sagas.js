import { call, put, takeEvery, select, all } from "redux-saga/effects";

import CONCEPT_TYPES from "./types";
import conceptActions from "./actions";
import { selectors } from "../../store";
import conceptRest from "../../rest/conceptRest";

function* fetchConcepts(action) {


  // TODO
  // clean up/simplify the default OBS rep (but check out lab entry uses it)
  // update form to use concept from store
  // reducer to clear the store
  // REST endpoint to return multiple concepts
  // clean up types (bigger task)
  // review takeLatest vs takeAll

  // only fetch concepts that aren't already in the store
  const concepts = yield select(selectors.getConcepts);
  const conceptUuids = action.conceptUuids.filter((conceptUuid) => !(conceptUuid in concepts));

  try {

    if (conceptUuids.length > 0) {
      const results =  yield all(
        conceptUuids.map((conceptUuid) => call(conceptRest.getConcept, conceptUuid))
      );

      yield put(conceptActions.fetchConceptsSucceeded(results));
    }
    // TODO some other action if no concepts to fetch?
  }
  catch (e) {
    yield put(conceptActions.fetchConceptsFailed(e.message));
  }

}

function* conceptSagas() {
  yield takeEvery(CONCEPT_TYPES.FETCH_REQUESTED, fetchConcepts);
}

export default conceptSagas;
