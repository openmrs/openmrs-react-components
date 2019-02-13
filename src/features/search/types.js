import types from 'redux-types';

import { BASIC_TYPES } from "../../types";

export default types('patientSearch', [ ...BASIC_TYPES, 'CLEAR_SEARCH', 'SAVE_ACTIVE_SEARCH'] );
