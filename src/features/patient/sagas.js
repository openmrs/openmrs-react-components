import { call, put, takeEvery } from 'redux-saga/effects';
import PATIENT_TYPES from './types';
import patientActions from './actions';
import uuidv4 from 'uuid/v4';
import visitRest from "../../rest/visitRest";


function* submit(action) {

  try {

    let encounterUuid = uuidv4();
    let today = new Date();
    // create visit with encounter
    let visit = {
      patient: action.patient.uuid,
      startDatetime: today,
      location: {
        uuid: action.locationType.uuid
      },
      visitType: {
        uuid: action.visitType.uuid
      },
      encounters: [
        {
          uuid: encounterUuid,
          patient: {
            uuid: action.patient.uuid
          },
          location: {
            uuid: action.locationType.uuid
          },
          encounterType: {
            uuid: action.encounterType.uuid
          },
          encounterDatetime: today,
          voided: false
        }
      ],
      voided: false
    };

    yield call(visitRest.createVisit, { visit: visit });
    yield put(patientActions.checkInSucceeded(action.values));

    if (action.formSubmittedActionCreator) {
      yield put(action.formSubmittedActionCreator(action.values));
    }

  } catch (e) {
    yield put(patientActions.checkInFailed(action.values));
  }


}

function *patientSagas() {
  yield takeEvery(PATIENT_TYPES.SUBMIT, submit);
}

export default patientSagas;
