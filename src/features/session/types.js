import types from 'redux-types';

import { BASIC_TYPES } from "../../types";
export default types('session', [
  ...BASIC_TYPES,
  'SET_SESSION_LOCATION_REQUESTED'
]);

