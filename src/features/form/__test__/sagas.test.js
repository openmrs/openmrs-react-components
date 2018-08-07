import SagaTester from 'redux-saga-tester';
import formActions from '../actions.js';
import formSagas from '../sagas.js';
import encounterRest from '../../../rest/encounterRest';

jest.mock('../../../rest/encounterRest');

let formSubmittedActionCreator;

describe('form sagas', () => {

  let sagaTester = null;

  const values =
    { observations: [
      {
        comment: undefined,
        concept: {
          name: "WEIGHT",
          uuid: "3ce93b62-26fe-102b-80cb-0017a47871b2",
          datatype: "Numeric",
          conceptClass: "Misc",
          conceptHandler: null,
          properties: {
            allowDecimals: false,
          },
        },
        formFieldPath: "Test Form.undefined/2-0",
        formNamespace: "Bahmni",
        inactive: false,
        interpretation: null,
        value: "120",
        voided: false
      },
      {
        comment: undefined,
        concept: {
          name: "HEIGHT",
          uuid: "3ce93cf2-26fe-102b-80cb-0017a47871b2",
          datatype: "Numeric",
          conceptClass: "Misc",
          conceptHandler: null,
          properties: {
            allowDecimals: false,
          },
        },
        formFieldPath: "Test Form.undefined/3-0",
        formNamespace: "Bahmni",
        inactive: false,
        interpretation: null,
        value: "140",
        voided: false
      },
    ] };

  const patient = {
    uuid: "some_patient_uuid"
  };

  const visit = {
    uuid: "some_visit_uuid"
  };

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(formSagas);
    formSubmittedActionCreator = jest.fn(() => { return { type:'SOME_ACTION_TYPE' };});
    encounterRest.createEncounter = jest.fn(encounterRest.createEncounter);   // for some reason, we need to wrap this in jest.fn here, not in the mock itself
  });

  it('should create an encounter and issue formSubmittedActionCreator', () => {

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted(values, patient, encounterType, visit, formSubmittedActionCreator));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);  // TODO would be good if we could actually test what it is was called with here, but the newDate() causes issues
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed());
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });

  it('should issue failure if invalid submit', () => {

    const encounterType = {
      uuid: "invalid_encounter_type"
    };

    sagaTester.dispatch(formActions.formSubmitted(values, patient, encounterType, visit, formSubmittedActionCreator));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitSucceeded(formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitFailed("Unable to Submit"));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(0);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formSubmittedActionCreator());
  });

  it('should handle form submitted action creator that is an array of creators', () => {

    const anotherFormSubmittedActionCreator = jest.fn(() => { return { type:'ANOTHER_ACTION_TYPE' };});

    const encounterType = {
      uuid: "some_encounter_type_uuid"
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
