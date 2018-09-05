import patientHeaderSaga from "../sagas";
import PATIENT_HEADER_TYPES from '../types';

let sagaTester;
const { SagaTester } = global;

describe('patientHeaderSaga', () => {
  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(patientHeaderSaga);
  });
  it('should run getPatient() saga', () => {
    expect(sagaTester.getCalledActions()).toEqual([]);
    expect(sagaTester.wasCalled(PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED)).toEqual(false);
    sagaTester.dispatch({ type: PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED });
    expect(sagaTester.wasCalled(PATIENT_HEADER_TYPES.SET_PATIENT.REQUESTED)).toEqual(true);
  });
}); 
