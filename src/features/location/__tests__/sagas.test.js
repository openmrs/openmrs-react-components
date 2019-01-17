import SagaTester from 'redux-saga-tester';
import locationSagas from "../sagas";
import locationActions from '../actions';

jest.mock('../../../rest/locationRest');

describe('location sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(locationSagas);
  });

  it('patientIdentifierTypes saga should request patientIdentifierTypes', () => {
    sagaTester.dispatch(locationActions.fetchAllLocations());
    expect(sagaTester.getCalledActions()[0]).toEqual(locationActions.fetchAllLocations());
    expect(sagaTester.getCalledActions()[1].type).toEqual(locationActions.fetchAllLocationsFailed()['type']);
  });
});
