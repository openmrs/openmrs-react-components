import globalPropertyActions from '../actions';
import GLOBAL_PROPERTY_TYPES from '../types';

describe('global property actions', () => {

  it('should create a fetch global property action', () => {
    const expectedAction = {
      type: GLOBAL_PROPERTY_TYPES.FETCH_REQUESTED,
      globalProperty: "somemodule.someglobalproperty"
    };

    expect(globalPropertyActions.fetchGlobalProperty("somemodule.someglobalproperty")).toEqual(expectedAction);
  });

  it('should create a fetch succeeded action', () => {

    const gp = {
      property: "somemodule.someglobalproperty",
      value: "some_value"
    };

    const expectedAction = {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: gp
    };

    expect(globalPropertyActions.fetchGlobalPropertySucceeded(gp)).toEqual(expectedAction);
  });

  it('should create a fetch failed action', () => {
    const expectedAction = {
      type: GLOBAL_PROPERTY_TYPES.FETCH_FAILED,
      message: "some message"
    };

    expect(globalPropertyActions.fetchGlobalPropertyFailed("some message")).toEqual(expectedAction);
  });

  it('should create a clear cache action', () => {
    const expectedAction = {
      type: GLOBAL_PROPERTY_TYPES.CLEAR_CACHE
    };

    expect(globalPropertyActions.clearGlobalPropertiesCache()).toEqual(expectedAction);
  });

});
