import { call, put, takeEvery } from "redux-saga/effects";
import FETCH_LOCATIONS_TYPES from "./types";
import fetchLocationsActions from './actions';
import locationRest from "../../rest/locationRest";

function* fetchAllLocations() {
  try {
    let response = yield call(locationRest.fetchAllLocations);

    yield put(fetchLocationsActions.fetchAllLocationsSucceeded(response.results));
  }
  catch (e) {
    yield put(fetchLocationsActions.fetchAllLocationsFailed(e.message));
  }
}

function* fetchLocationsSagas() {
  yield takeEvery(FETCH_LOCATIONS_TYPES.REQUESTED, fetchAllLocations);
}

export default fetchLocationsSagas;
