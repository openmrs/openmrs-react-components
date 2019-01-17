import locationActions from '../actions';
import FETCH_LOCATIONS_TYPES from '../types';

describe('locations actions', () => {
  const locations = [
    {
      uuid: 'some-uuid',
      display: 'mock-location'
    },
    {
      uuid: 'another-uuid',
      display: 'mock-location1'
    }
  ];

  it('should create a fetch location action', () => {
    const expectedAction = {
      type: FETCH_LOCATIONS_TYPES.REQUESTED,
    };

    expect(locationActions.fetchAllLocations()).toEqual(expectedAction);
  });

  it('should create a fetch succeeded action', () => {
    const expectedAction = {
      type: FETCH_LOCATIONS_TYPES.SUCCEEDED,
      locations: locations
    };

    expect(locationActions.fetchAllLocationsSucceeded(locations)).toEqual(expectedAction);
  });

  it('should create a fetch failled action', () => {
    const expectedAction = {
      type: FETCH_LOCATIONS_TYPES.FAILED,
      message: 'Unable to load locations'
    };

    expect(locationActions.fetchAllLocationsFailed('Unable to load locations')).toEqual(expectedAction);
  });

});
