import { globalPropertyReducer } from "../reducers";
import GLOBAL_PROPERTY_TYPES from "../types";

describe ('global property reducer test', () => {

  it('should return the initial state', () => {
    expect(globalPropertyReducer(undefined, {})).toEqual({});
  });

  it('should handle empty results', () => {
    expect(globalPropertyReducer({}, {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: {}
    }))
      .toEqual({});
  });

  it('should add property to empty state', ()=> {
    const globalProperties = globalPropertyReducer({}, {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: {
        property: 'someModule.someGlobalProperty',
        value: 'some_value'
      }
    });

    expect(globalProperties['someModule.someGlobalProperty']).toEqual('some_value');
  });

  it('should keep existing state if no global property added', () => {
    const globalProperties = globalPropertyReducer({
      'someModule.someGlobalProperty': 'some_value'
    }, {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: {}
    });

    expect(globalProperties['someModule.someGlobalProperty']).toEqual('some_value');
  });

  it('should add global property to existing state', () => {
    const globalProperties = globalPropertyReducer({
      'someModule.someGlobalProperty': 'some_value'
    }, {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: {
        property: 'someModule.anotherGlobalProperty',
        value: 'another_value'
      }
    });

    expect(globalProperties['someModule.someGlobalProperty']).toEqual('some_value');
    expect(globalProperties['someModule.anotherGlobalProperty']).toEqual('another_value');
  });

  // note that, fwiw, the saga we use won't actually make the REST call if the GP exists
  it('should update global property value', () => {
    const globalProperties = globalPropertyReducer({
      'someModule.someGlobalProperty': 'some_value'
    }, {
      type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
      globalProperty: {
        property: 'someModule.someGlobalProperty',
        value: 'another_value'
      }
    });

    expect(globalProperties['someModule.someGlobalProperty']).toEqual('another_value');
  });

  it('clear action should clear cache', () => {
    const globalProperties = globalPropertyReducer({
      'someModule.someGlobalProperty': 'some_value'
    }, {
      type: GLOBAL_PROPERTY_TYPES.CLEAR_CACHE
    });

    expect(globalProperties).toEqual({});
  });
});
