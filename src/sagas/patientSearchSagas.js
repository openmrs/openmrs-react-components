import { call, put, takeLatest } from "redux-saga/effects";
import { PATIENT_SEARCH_ACTIONS} from "../actions/types";
import patientApi from "../api/patientApi";


function* patientSearch(action) {
    try {

        let response = yield call(patientApi.findPatient, {
            query: action.query,
            representation: action.representation
        });

        if (response.status === 200) {
            yield put({
                type: PATIENT_SEARCH_ACTIONS.SUCCEEDED,
                results: response.data.results
            });
        } else {
            yield put({ type: PATIENT_SEARCH_ACTIONS.FAILED, message: "Failed to find patients" });
        }

    }
    catch (e) {
        yield put({ type: PATIENT_SEARCH_ACTIONS.FAILED, message: e.message  });
    }
}

function* patientSearchSagas() {
    yield takeLatest(PATIENT_SEARCH_ACTIONS.REQUESTED, patientSearch);
}


export default patientSearchSagas;
