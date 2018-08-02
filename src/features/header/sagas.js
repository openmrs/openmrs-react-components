import { call, put, takeLatest } from 'redux-saga/effects';
import appFrameworkApi from '../../rest/appframeworkRest';
import HEADER_TYPES from './types';
import headerActions from './actions';

function* getHeaderLogoLinks(action) {
  try {

    let response = yield call(appFrameworkApi.fetchHeaderLogoLinks);
    if (response.results.length > 0 ) {
      yield put(headerActions.getHeaderLogoLinksSucceeded(response.results[0]));
    }

  }
  catch (e) {
    yield put(headerActions.getHeaderLogoLinksFailed(e.message));
  }
}


function* loginSagas() {
  yield takeLatest(HEADER_TYPES.LOGO_LINKS.REQUESTED, getHeaderLogoLinks);
}


export default loginSagas;
