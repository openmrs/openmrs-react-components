import { DEFAULT_PATIENT_REP } from '../patient/constants';
import { DEFAULT_ENCOUNTER_REP } from '../encounter/constants';

// the default REST representation to use when fetching a visit
export const DEFAULT_VISIT_REP = '(uuid,location:(uuid,display,name),startDatetime,stopDatetime,patient:' + DEFAULT_PATIENT_REP + ',encounters:' + DEFAULT_ENCOUNTER_REP + ')';
