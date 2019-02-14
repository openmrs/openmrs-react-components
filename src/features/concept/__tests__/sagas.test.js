import SagaTester from 'redux-saga-tester';
import conceptActions from '../actions';
import conceptSagas from '../sagas';

jest.mock('../../../rest/conceptRest');

describe('concept sagas', () => {

  const conceptFromServer = {
    uuid: "some-concept-uuid",
    name: "some name"
  };

  const anotherConceptFromServer = {
    uuid: "another-concept-uuid",
    name: "another-name"
  };

  it('tests saga with successful fetch', () => {

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
      conceptFromServer, anotherConceptFromServer
    ]));
  });

  it('tests the concept saga when passing in concept objects instead of uuids ', () => {

    const initialState = {
      openmrs: {
        metadata: {
          concepts: {
          }
        }
      }
    };

    const concept1 = {
      uuid: 'some-concept-uuid'
    };

    const concept2 = {
      uuid: 'another-concept-uuid'
    };


    const sagaTester = new SagaTester({
      initialState: initialState
    });
    sagaTester.start(conceptSagas);

    sagaTester.dispatch(conceptActions.fetchConcepts([concept1, concept2]));

    expect(sagaTester.getCalledActions()).toContainEqual(conceptActions.fetchConceptsSucceeded([
      conceptFromServer, anotherConceptFromServer
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
      anotherConceptFromServer
    ]));
  });

  it('should override concept properties from server', () => {

    const initialState = {
      openmrs: {
        metadata: {
          concepts: {
          }
        }
      }
    };

    const concept1 = {
      uuid: 'some-concept-uuid',
      name: 'overridden name'
    };

    const concept2 = {
      uuid: 'another-concept-uuid',
      name: 'another overridden name'
    };

    const sagaTester = new SagaTester({
      initialState: initialState
    });
    sagaTester.start(conceptSagas);

    sagaTester.dispatch(conceptActions.fetchConcepts([concept1, concept2]));

    expect(sagaTester.getCalledActions()).toContainEqual(conceptActions.fetchConceptsSucceeded([
      concept1, concept2
    ]));
  });


});
