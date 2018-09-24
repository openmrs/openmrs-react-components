import SagaTester from 'redux-saga-tester';
import visitSagas from '../sagas';
import visitActions from '../actions';

jest.mock('../../../rest/visitRest');

describe('visit sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(visitSagas);
  });

  it('active visits saga should fetch visit', () => {

    const expectedResponse =  [
      {
        "uuid": "some_uuid"
      },
      {
        "uuid": "another_uuid"
      }
    ];

    sagaTester.dispatch(visitActions.fetchActiveVisits());
    expect(sagaTester.getCalledActions()).toContainEqual(visitActions.fetchActiveVisitsSucceeded(expectedResponse));
  });

  it('active visits saga should return fetch failed action if fetch fails', () => {
    sagaTester.dispatch(visitActions.fetchActiveVisits("invalid"));
    expect(sagaTester.getCalledActions()).toContainEqual(visitActions.fetchActiveVisitsFailed("Invalid"));
  });


});
