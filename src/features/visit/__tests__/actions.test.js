import visitActions from '../actions';
import VISIT_TYPES from '../types';

describe('visit actions', () => {

  it('should create fetch active visits action', () => {
    const expectedAction = {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED
    };
    expect(visitActions.fetchActiveVisits()).toEqual(expectedAction);
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

  it('should create fetch active visits action with set patient store=true', () => {
    const expectedAction = {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_REQUESTED,
      setPatientStore: true
    };
    expect(visitActions.setPatientStoreWithActiveVisitPatients()).toEqual(expectedAction);
  });

});
