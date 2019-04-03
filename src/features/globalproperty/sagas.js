import { takeEvery, call, put, select } from "redux-saga/effects";

import GLOBAL_PROPERTY_TYPES from './types';
import globalPropertyActions from './actions';
import globalPropertyRest from '../../rest/globalPropertyRest';

import { selectors } from '../../store';

function* fetchGlobalProperty(action) {

  // TODO add support for not requesting a global property if there's a pending fetch?

  // do nothing if no global property specified
  if (action.globalProperty === null) {
    return;
  }

  // don't do anything if global property is already in store
  // TODO should this issue some sort of action?
  const existing = yield select(selectors.getGlobalProperty, action.globalProperty);
  if (existing !== null) {
    return;
  }

  try {
    const propertyValue = yield call(globalPropertyRest.getGlobalProperty, action.globalProperty);
    yield put(globalPropertyActions.fetchGlobalPropertySucceeded(propertyValue));
  }
  catch (e) {
    yield put(globalPropertyActions.fetchGlobalPropertyFailed(e.message));
  }

}


function* globalPropertySagas() {
  yield takeEvery(GLOBAL_PROPERTY_TYPES.FETCH_REQUESTED, fetchGlobalProperty);
}

export default globalPropertySagas;
