import { call, put, takeLatest } from 'redux-saga/effects';
import locationApi from '../../rest/locationRest';
import LOCATION_TYPES from './types';
import locationAction from './actions';

function* fetchCurrentLocation() {
  try {
    const location = yield call(locationApi.fetchLocations);
    yield put(locationAction.fetchLocationsSucceded(location));
  }
  catch (e) {
    yield put(locationAction.fetchLocationsFailed(e.message));
  }
}

function* locationSagas() {
  yield takeLatest(LOCATION_TYPES.FETCH_REQUESTED, fetchCurrentLocation);
}

export default locationSagas;
