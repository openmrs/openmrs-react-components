import SagaTester from 'redux-saga-tester';
import formActions from '../actions';
import openmrsFormSagas from '../sagas';
import encounterRest from '../../../rest/encounterRest';

jest.mock('../../../rest/encounterRest');

let formSubmittedActionCreator;

describe('form sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(openmrsFormSagas);
    formSubmittedActionCreator = jest.fn(() => { return { type:'SOME_ACTION_TYPE' };});
    encounterRest.createEncounter = jest.fn(encounterRest.createEncounter);   // for some reason, we need to wrap this in jest.fn here, not in the mock itself
  });

  it('should create an encounter and issue formSubmittedActionCreator', () => {

    const values =  { 'obs|path=first-obs|concept=first-obs-uuid': 100 ,
      'obs|path=first-obs|concept=first-obs-uuid': 200 }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted(values, patient, encounterType, visit, formSubmittedActionCreator));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);  // TODO would be good if we could actually test what it is was called with here, but the newDate() causes issues
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed());
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });

  it('should issue failure if invalid submit', () => {

    const values =  { 'obs|path=first-obs|concept=first-obs-uuid': 100 ,
      'obs|path=first-obs|concept=first-obs-uuid': 200 }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "invalid_encounter_type"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted(values, patient, encounterType, visit, formSubmittedActionCreator));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitSucceeded(formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitFailed());
    expect(formSubmittedActionCreator.mock.calls.length).toBe(0);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formSubmittedActionCreator());
  });

  it('should handle form submitted action creator that is an array of creators', () => {

    const anotherFormSubmittedActionCreator = jest.fn(() => { return { type:'ANOTHER_ACTION_TYPE' };});

    const values =  { 'obs|path=first-obs|concept=first-obs-uuid': 100 ,
      'obs|path=first-obs|concept=first-obs-uuid': 200 }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted(values, patient, encounterType, visit, [ formSubmittedActionCreator, anotherFormSubmittedActionCreator ]));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);  // TODO would be good if we could actually test what it is was called with here, but the newDate() causes issues
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded([ formSubmittedActionCreator, anotherFormSubmittedActionCreator ]));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed());
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
    expect(anotherFormSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(anotherFormSubmittedActionCreator());
  });

});
