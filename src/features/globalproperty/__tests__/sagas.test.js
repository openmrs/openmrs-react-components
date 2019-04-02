import SagaTester from 'redux-saga-tester';
import globalPropertyActions from '../actions';
import globalPropertySagas from '../sagas';

// TODO reducer and selectors

jest.mock('../../../rest/globalPropertyRest');

describe('global property sagas', () => {

  it('tests saga with successful fetch', () => {

    const initialState = {
      openmrs: {
        metadata: {
          globalProperties: {

          }
        }
      }
    };

    const sagaTester = new SagaTester({
      initialState: initialState
    });

    sagaTester.start(globalPropertySagas);

    sagaTester.dispatch(globalPropertyActions.fetchGlobalProperty("someModule.someGlobalProperty"));

    expect(sagaTester.getCalledActions()).toContainEqual(globalPropertyActions.fetchGlobalPropertySucceeded({
      property: 'someModule.someGlobalProperty',
      value: 'some_value'
    }));
  });

  it('should not fetch global property already in store', () => {

    const initialState = {
      openmrs: {
        metadata: {
          globalProperties: {
            'someModule.someGlobalProperty': 'some_value'
          }
        }
      }
    };

    const sagaTester = new SagaTester({
      initialState: initialState
    })
    sagaTester.start(globalPropertySagas);

    sagaTester.dispatch(globalPropertyActions.fetchGlobalProperty("someModule.someGlobalProperty"));

    expect(sagaTester.getCalledActions()).not.toContainEqual(globalPropertyActions.fetchGlobalPropertySucceeded({
      property: 'someModule.someGlobalProperty',
      value: 'some_value'
    }));

  });

});
