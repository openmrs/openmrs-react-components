import { call, put, takeEvery, select, all } from "redux-saga/effects";

import CONCEPT_TYPES from "./types";
import conceptActions from "./actions";
import { selectors } from "../../store";
import conceptRest from "../../rest/conceptRest";

function* fetchConcepts(action) {

  // TODO add support for not requesting a concept if there's a pending fetch?

  // handle either full concepts object or uuids
  const conceptUuids = action.concepts.map(c => c.uuid ? c.uuid : c);

  // only fetch concepts that aren't already in the store
  const concepts = yield select(selectors.getConcepts);
  const conceptUuidsToFetch = conceptUuids.filter((conceptUuid) => !(conceptUuid in concepts));

  try {

    if (conceptUuidsToFetch.length > 0) {
      const results =  yield all(
        conceptUuidsToFetch.map((conceptUuid) => call(conceptRest.getConcept, conceptUuid))
      );

      // merge results with passed in concepts so that properties can be overridden
      const mergedResults = results.map(concept => {
        return {
          ...concept,
          ...action.concepts.find(matchingConcept => concept.uuid === matchingConcept.uuid)
        };
      });

      yield put(conceptActions.fetchConceptsSucceeded(mergedResults));
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
