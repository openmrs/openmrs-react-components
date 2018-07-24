import types from 'redux-types';

import { BASIC_TYPES } from "../../types";

export default {
  LOGIN: types('login', BASIC_TYPES),
  LOGIN_LOCATIONS: types('login_locations', BASIC_TYPES)
};
