import visitActions from '../actions';
import VISIT_TYPES from '../types';

describe('visit actions', () => {

  it('should create fetch active visits action', () => {
    const expectedAction = {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED,
      representation: "some_representation"
    };
    expect(visitActions.fetchActiveVisits("some_representation")).toEqual(expectedAction);
  });

  it('should create fetch active visits succeeded action', () => {

    const expectedVisits = [ { visit: "mock_visit" } ]

    const expectedAction = {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: expectedVisits
    };
    expect(visitActions.fetchActiveVisitsSucceeded(expectedVisits)).toEqual(expectedAction);
  });

  it('should create fetch active visits failed action', () => {

    const expectedAction = {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_FAILED
    };
    expect(visitActions.fetchActiveVisitsFailed()).toEqual(expectedAction);
  });

});
