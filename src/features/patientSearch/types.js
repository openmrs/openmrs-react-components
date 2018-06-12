import types from 'redux-types';

import {BASIC_TYPES} from "../../types";

export default types('patientSearch', BASIC_TYPES.concat(['PATIENT_SELECTED', 'CLEAR_SELECTED']));
