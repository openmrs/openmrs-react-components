import SagaTester from 'redux-saga-tester';
import visitSagas from '../sagas';
import visitActions from '../actions';
import patientActions from '../../patient/actions';

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
        "uuid": "some_uuid",
        "patient": {
          "uuid": "patient_uuid"
        }
      },
      {
        "uuid": "another_uuid",
        "patient": {
          "uuid": "another_patient_uuid"
        }
      }
    ];

    sagaTester.dispatch(visitActions.fetchActiveVisits());
    expect(sagaTester.getCalledActions().length).toEqual(4);
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.setPatientStoreUpdating());
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.updateActiveVisitsInStore(expectedResponse));
    expect(sagaTester.getCalledActions()).toContainEqual(visitActions.fetchActiveVisitsSucceeded(expectedResponse));
  });

  it('active visits saga should return fetch failed action if fetch fails', () => {
    sagaTester.dispatch(visitActions.fetchActiveVisits("invalid"));
    expect(sagaTester.getCalledActions()).toContainEqual(visitActions.fetchActiveVisitsFailed("Invalid"));
  });

  it('active visits saga should fetch visit and clear store if setPatientStore set to true', () => {

    const expectedResponse =  [
      {
        "uuid": "some_uuid",
        "patient": {
          "uuid": "patient_uuid"
        }
      },
      {
        "uuid": "another_uuid",
        "patient": {
          "uuid": "another_patient_uuid"
        }
      }
    ];

    const expectedPatients = [
      {
        "uuid": "patient_uuid"
      },
      {
        "uuid": "another_patient_uuid"
      }
    ];

    sagaTester.dispatch(visitActions.setPatientStoreWithActiveVisitPatients());
    expect(sagaTester.getCalledActions().length).toEqual(5);
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.setPatientStoreUpdating());
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.setPatientStore(expectedPatients));
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.updateActiveVisitsInStore(expectedResponse));
    expect(sagaTester.getCalledActions()).toContainEqual(visitActions.fetchActiveVisitsSucceeded(expectedResponse));
  });

});
