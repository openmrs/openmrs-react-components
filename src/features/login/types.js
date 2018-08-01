import types from 'redux-types';

import { BASIC_TYPES } from "../../types";

export default {
  LOGIN: types('login', BASIC_TYPES),
  LOGIN_LOCATIONS: types('login_locations', BASIC_TYPES),
  LOGIN_LOGO_LINKS: types('login_logo_links', BASIC_TYPES)
};
