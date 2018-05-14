/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { saga as openmrsSaga, reducers as openmrsReducers } from 'openmrs-contrib-reactcomponents';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

const rootReducer = combineReducers({
  orderEntry: reducers,
  openmrs: openmrsReducers,
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
  sagaMiddleware.run(openmrsSaga);
  return store;
};
