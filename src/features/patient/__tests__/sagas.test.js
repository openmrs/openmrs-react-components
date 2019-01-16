import SagaTester from 'redux-saga-tester';
import patientSagas from '../sagas';
import patientActions from '../actions';

describe('patient sagas', ()=> {

  let sagaTester = null;

  beforeEach(() => {

    // not realistic action to call, but just to tes
    const initialState = {
      openmrs: {
        patients: {
          set: {
            'existing_selected_patient': {
              uuid: "existing_selected_patient"
            }
          },
          selected: 'existing_selected_patient',
          selectPatientActionCreators: [
            patientActions.updatePatientInStore
          ]
        }
      }
    };

    sagaTester = new SagaTester({
      initialState: initialState
    });

    sagaTester.start(patientSagas);
  });

  it('set selected patient action should trigger registered action creators', () => {

    const patient = {
      uuid: "some_patient_uuid"
    };

    sagaTester.dispatch(patientActions.setSelectedPatient(patient));
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.updatePatientInStore(patient));

  });

  it('refresh selected patient action should trigger registered action creators', () => {

    const patient = {
      uuid: "existing_selected_patient"
    };

    sagaTester.dispatch(patientActions.refreshSelectedPatient());
    expect(sagaTester.getCalledActions()).toContainEqual(patientActions.updatePatientInStore(patient));

  });

});
