import SagaTester from 'redux-saga-tester';
import patientSearchSagas from '../sagas';
import patientSearchActions from '../actions';

jest.mock('../../../rest/patientRest');

describe('patient search sagas', () => {

  let sagaTester = null;

  const parseResultsMock = jest.fn();

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(patientSearchSagas);
  });

  it('patient search saga should fetch patients', () => {

    const expectedResponse = [
      {
        "uuid": "some_uuid"
      },
      {
        "uuid": "another_uuid"
      }
    ];

    sagaTester.dispatch(patientSearchActions.patientSearch("some_query", null, "some_representation"));
    expect(sagaTester.getCalledActions()).toContainEqual(patientSearchActions.patientSearchSucceeded(expectedResponse));
  });

  it('patient search saga should return search failed if search fails', () => {
    sagaTester.dispatch(patientSearchActions.patientSearch("some_query", null, "invalid"));
    expect(sagaTester.getCalledActions()).toContainEqual(patientSearchActions.patientSearchFailed("Invalid"));
  });

  it('patient search saga should parse response if parser function passed in', () => {

    const parser = (results) => results.filter((result) => result.uuid === 'some_uuid');

    const expectedResponse = [
      {
        "uuid": "some_uuid"
      }
    ];

    sagaTester.dispatch(patientSearchActions.patientSearch("some_query", parser, "some_representation"));
    expect(sagaTester.getCalledActions()).toContainEqual(patientSearchActions.patientSearchSucceeded(expectedResponse));
  });

});
