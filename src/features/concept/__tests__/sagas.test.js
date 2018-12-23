import SagaTester from 'redux-saga-tester';
import conceptActions from '../actions';
import conceptSagas from '../sagas';

jest.mock('../../../rest/conceptRest');

describe('concept sagas', () => {

  it('tests the concept saga with successful fetch', () => {

    const initialState = {
      openmrs: {
        metadata: {
          concepts: {
          }
        }
      }
    };

    const sagaTester = new SagaTester({
      initialState: initialState
    });
    sagaTester.start(conceptSagas);

    sagaTester.dispatch(conceptActions.fetchConcepts(['some-concept-uuid', 'another-concept-uuid']));

    expect(sagaTester.getCalledActions()).toContainEqual(conceptActions.fetchConceptsSucceeded([
      { uuid: 'some-concept-uuid' }, { uuid: 'another-concept-uuid' }
    ]));
  });

  it('should not fetch concept already in store', () => {

    const initialState = {
      openmrs: {
        metadata: {
          concepts: {
            'some-concept-uuid': {
              uuid: 'some-concept-uuid'
            }
          }
        }
      }
    };

    const sagaTester = new SagaTester({
      initialState: initialState
    });
    sagaTester.start(conceptSagas);

    sagaTester.dispatch(conceptActions.fetchConcepts(['some-concept-uuid', 'another-concept-uuid']));

    expect(sagaTester.getCalledActions()).toContainEqual(conceptActions.fetchConceptsSucceeded([
      { uuid: 'another-concept-uuid' }
    ]));
  });
});
