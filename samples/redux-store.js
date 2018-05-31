/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { sagas as openmrsSagas, reducers as openmrsReducers } from '@openmrs/react-components';
import { reducer as reduxFormReducer } from 'redux-form'
// import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const rootReducer = combineReducers({
  // owaNamespace: reducers,    // add your own reducers here under the namespace you chose
  openmrs: openmrsReducers,
  form: reduxFormReducer
})


if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default () => {
  const store = createStore(rootReducer, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension() : f => f,
  ));
  sagaMiddleware.run(openmrsSagas);
  return store;
};
