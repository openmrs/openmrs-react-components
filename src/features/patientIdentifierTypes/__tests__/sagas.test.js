import SagaTester from 'redux-saga-tester';
import patientIdentifierTypesSagas from "../sagas";
import patientIdentifierTypesActions from '../actions';

jest.mock('../../../rest/patientRest');

describe('patientIdentifierTypes sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(patientIdentifierTypesSagas);
  });

  it('patientIdentifierTypes saga should request patientIdentifierTypes', () => {
    sagaTester.dispatch(patientIdentifierTypesActions.fetchPatientIdentifierTypes());
    expect(sagaTester.getCalledActions()[0]).toEqual(patientIdentifierTypesActions.fetchPatientIdentifierTypes());
    expect(sagaTester.getCalledActions()[1].type).toEqual(patientIdentifierTypesActions.fetchPatientIdentifierTypesFailed()['type']);
  });
});
