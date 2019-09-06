import SagaTester from 'redux-saga-tester';
import { format, startOfDay, subDays, parse, differenceInSeconds } from 'date-fns';
import formActions from '../actions';
import openmrsFormSagas from '../sagas';
import encounterRest from '../../../rest/encounterRest';
import obsRest from '../../../rest/obsRest';
import { FORM_STATES } from "../constants";

jest.mock('../../../rest/encounterRest');
jest.mock('../../../rest/obsRest');

let formSubmittedActionCreator;

const encounterReturnedByEncounterRestMock =  {
  uuid: "fetched-encounter"
};

describe('form sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(openmrsFormSagas);
    formSubmittedActionCreator = jest.fn((payload) => { return { type:'SOME_ACTION_TYPE', encounter: payload.encounter };});
    encounterRest.createEncounter = jest.fn(encounterRest.createEncounter);   // for some reason, we need to wrap this in jest.fn here, not in the mock itself
    encounterRest.updateEncounter = jest.fn(encounterRest.updateEncounter);
    obsRest.deleteObs = jest.fn(obsRest.deleteObs);
    obsRest.getObs = jest.fn(obsRest.getObs);
  });

  it('should create an encounter and issue formSubmittedActionCreator', () => {

    const formInstanceId = "form-instance-id";
    const date = format(startOfDay(new Date()));

    const values =  {
      'encounter-datetime': date,
      'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const location = {
      uuid: "some_location_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const provider = {
      uuid: "some_provider_uuid"
    };

    const encounterRole = {
      uuid: "some_encounter_role_uuid"
    };

    const order = {
      uuid: "some_order_uuid"
    };

    const expectedEncounterPost = {
      "encounterDatetime": date,
      "location": "some_location_uuid",
      "encounterProviders": [
        { "provider": "some_provider_uuid",
          "encounterRole": "some_encounter_role_uuid"
        }
      ],
      "encounterType": "some_encounter_type_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "order": "some_order_uuid",
          "value": 100
        },
        { "comment": "form-id^second-obs",
          "concept": "second-obs-uuid",
          "order": "some_order_uuid",
          "value": 200
        }
      ],
      "patient": "some_patient_uuid",
      "visit": "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterRole: encounterRole,
      encounterType: encounterType,
      location: location,
      orderForObs: order,
      provider: provider,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.createEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.setFormState(formInstanceId, FORM_STATES.VIEWING));
  });

  it('should issue failure if invalid submit', () => {

    const formInstanceId = "form-instance-id";

    const values =  { 'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200 }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "invalid_encounter_type"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted({
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      vist: visit,
      formSubmittedActionCreator: formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(0);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should handle form submitted action creator that is an array of creators', () => {

    const formInstanceId = "form-instance-id";

    const anotherFormSubmittedActionCreator = jest.fn((payload) => { return { type:'ANOTHER_ACTION_TYPE', encounter: payload.encounter };});

    const values =  { 'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200 }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator: [ formSubmittedActionCreator, anotherFormSubmittedActionCreator ]
    } ));

    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);  // TODO would be good if we could actually test what it is was called with here, but the newDate() causes issues
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, [ formSubmittedActionCreator, anotherFormSubmittedActionCreator ], encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
    expect(anotherFormSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(anotherFormSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should update encounter and issue formSubmittedActionCreator', () => {

    const formInstanceId = "form-instance-id";
    const date = format(new Date());

    const values =  {
      'encounter-datetime': date,
      'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const encounter = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": date,
      "obs": [
        {
          "uuid": "existing_obs_uuid",
          "concept": {
            "uuid": "existing-obs-concept-uuid"
          },
          "comment": "form-id^second-obs"
        }
      ]
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": date,
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "value": 100
        },
        { "comment": "form-id^second-obs",
          "concept": "second-obs-uuid",
          "value": 200,
          "uuid": "existing_obs_uuid"
        }
      ],
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounter: encounter,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.updateEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.updateEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should not include field with empty value in post; should submit delete obs call', () => {

    const formInstanceId = "form-instance-id";

    const values =  { 'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': "" }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const encounter = {
      "uuid": "existing_encounter_uuid",
      "obs": [
        {
          "uuid": "existing_obs_uuid",
          "concept": {
            "uuid": "existing-obs-concept-uuid"
          },
          "comment": "form-id^second-obs"
        }
      ]
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "value": 100
        }
      ],
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounter: encounter,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.updateEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.updateEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);
    expect(obsRest.deleteObs).toHaveBeenCalledTimes(1);
    expect(obsRest.deleteObs.mock.calls[0][0].uuid).toBe("existing_obs_uuid");

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should delete empty parent obs', () => {

    const formInstanceId = "form-instance-id";

    const values =  {
      'obs|path=first-obs|conceptPath=first-obs-uuid': 'canceled',
      'obs|path=second-obs|conceptPath=second-obs-uuid': "",
      'obs|path=third-obs|conceptPath=third-obs-uuid': ""
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const encounter = {
      "uuid": "existing_encounter_uuid",
      "obs": [
        {
          "uuid": "existing_obs_uuid",
          "concept": {
            "uuid": "existing-obs-concept-uuid"
          },
          "comment": "form-id^second-obs"
        },
        {
          "uuid": "child-obs-uuid",
          "concept": {
            "uuid": "existing-third_obs-concept-uuid"
          },
          "comment": "form-id^third-obs"
        }
      ]
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "value": "canceled"
        }
      ],
    };


    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounter: encounter,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.updateEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.updateEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);
    expect(obsRest.deleteObs).toHaveBeenCalledTimes(3); // delete existing_obs_uuid, child-obs-uuid and parent-obs-uuid
    expect(obsRest.getObs).toHaveBeenCalledTimes(4);
    expect(obsRest.deleteObs.mock.calls[0][0].uuid).toBe("existing_obs_uuid");
    expect(obsRest.getObs.mock.calls[0][0]).toBe("existing_obs_uuid");
    expect(obsRest.deleteObs.mock.calls[1][0].uuid).toBe("child-obs-uuid");
    expect(obsRest.getObs.mock.calls[1][0]).toBe("child-obs-uuid");
    expect(obsRest.deleteObs.mock.calls[2][0].uuid).toBe("parent-obs-uuid");

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should not call delete obs for obs that is not previously exisiting', () => {

    const formInstanceId = "form-instance-id";

    const values =  { 'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': "" }  ;

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "value": 100
        }
      ],
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(obsRest.deleteObs).toHaveBeenCalledTimes(0);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });


  it('should not include encounter provider if no encounter role specified', () => {

    const formInstanceId = "form-instance-id";
    const date = format(new Date());

    const values =  {
      'encounter-datetime': date,
      'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const location = {
      uuid: "some_location_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const provider = {
      uuid: "some_provider_uuid"
    };

    const expectedEncounterPost = {
      "encounterDatetime": date,
      "location": "some_location_uuid",
      "encounterType": "some_encounter_type_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "value": 100
        },
        { "comment": "form-id^second-obs",
          "concept": "second-obs-uuid",
          "value": 200
        }
      ],
      "patient": "some_patient_uuid",
      "visit": "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      location: location,
      provider: provider,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.createEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should create an encounter with a nested obs group', () => {

    const formInstanceId = "form-instance-id";

    const date = format(startOfDay(new Date()));

    const values =  {
      'encounter-datetime': date,
      'obs|path=grouping^first-nested-obs|conceptPath=grouping_uuid^first-obs-uuid': 100 ,
      'obs|path=grouping^second-nested-obs|conceptPath=grouping_uuid^second-obs-uuid': 200,
      'obs|path=second_grouping^first-nested-obs|conceptPath=second_grouping_uuid^first-obs-uuid': 300 ,
      'obs|path=second_grouping^second-nested-obs|conceptPath=second_grouping_uuid^second-obs-uuid': 400
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const expectedEncounterPost = {
      "encounterDatetime": date,
      "encounterType": "some_encounter_type_uuid",
      "obs": [
        {
          "comment": "form-id^grouping",
          "concept": "grouping_uuid",
          "groupMembers":  [
            { "comment": "form-id^grouping^first-nested-obs",
              "concept": "first-obs-uuid",
              "value": 100
            },
            { "comment": "form-id^grouping^second-nested-obs",
              "concept": "second-obs-uuid",
              "value": 200
            }
          ]
        },
        {
          "comment": "form-id^second_grouping",
          "concept": "second_grouping_uuid",
          "groupMembers":  [
            { "comment": "form-id^second_grouping^first-nested-obs",
              "concept": "first-obs-uuid",
              "value": 300
            },
            { "comment": "form-id^second_grouping^second-nested-obs",
              "concept": "second-obs-uuid",
              "value": 400
            }
          ]
        }
      ],
      "patient": "some_patient_uuid",
      "visit": "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.createEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator, encounterReturnedByEncounterRestMock));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator({ encounter: encounterReturnedByEncounterRestMock }));
  });

  it('should not set form state back to VIEW if manuallyExitSubmitMode prop set to true', () => {

    const formInstanceId = "form-instance-id";
    const date = format(new Date());

    const values =  {
      'encounter-datetime': date,
      'obs|path=first-obs|conceptPath=first-obs-uuid': 100 ,
      'obs|path=second-obs|conceptPath=second-obs-uuid': 200
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const location = {
      uuid: "some_location_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const provider = {
      uuid: "some_provider_uuid"
    };

    const encounterRole = {
      uuid: "some_encounter_role_uuid"
    };

    const order = {
      uuid: "some_order_uuid"
    };

    const expectedEncounterPost = {
      "encounterDatetime": date,
      "location": "some_location_uuid",
      "encounterProviders": [
        { "provider": "some_provider_uuid",
          "encounterRole": "some_encounter_role_uuid"
        }
      ],
      "encounterType": "some_encounter_type_uuid",
      "obs": [
        { "comment": "form-id^first-obs",
          "concept": "first-obs-uuid",
          "order": "some_order_uuid",
          "value": 100
        },
        { "comment": "form-id^second-obs",
          "concept": "second-obs-uuid",
          "order": "some_order_uuid",
          "value": 200
        }
      ],
      "patient": "some_patient_uuid",
      "visit": "some_visit_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      manuallyExitSubmitMode: true,
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterRole: encounterRole,
      encounterType: encounterType,
      location: location,
      orderForObs: order,
      provider: provider,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));


    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.setFormState(formInstanceId, FORM_STATES.VIEWING))
  });


  it('should not update encounter datetime if date component does not change', () => {

    const formInstanceId = "form-instance-id";
    const today = format(new Date());
    const startOfToday = format(startOfDay(new Date()));

    const values =  {
      'encounter-datetime': startOfToday
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const encounter = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": today
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": today
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounter: encounter,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.updateEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.updateEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);
  });

  it('should update encounter datetime if date component changes', () => {

    const formInstanceId = "form-instance-id";
    const today = format(new Date());
    const startOfYesterday = format(startOfDay(subDays(new Date(),1)));

    const values =  {
      'encounter-datetime': startOfYesterday
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const visit = {
      uuid: "some_visit_uuid"
    };

    const encounter = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": today
    };

    const expectedEncounterPost = {
      "uuid": "existing_encounter_uuid",
      "encounterDatetime": startOfYesterday
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounter: encounter,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.updateEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.updateEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);
  });


  it('should timestamp new encounter if timestampNewEncounterIfCurrentDay is set true and is current day', () => {

    const formInstanceId = "form-instance-id";
    const today = format(startOfDay(new Date()));
    const now = new Date();

    const values =  {
      'encounter-datetime': today,
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      location: location,
      formSubmittedActionCreator:
      formSubmittedActionCreator,
      timestampNewEncounterIfCurrentDay: true
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    let submittedDatetime = parse(encounterRest.createEncounter.mock.calls[0][0].encounterDatetime);
    expect(Math.abs(differenceInSeconds(submittedDatetime, now))).toBeLessThanOrEqual(1);
  });

  it('should not timestamp new encounter if timestampNewEncounterIfCurrentDay is set true but not current day', () => {

    const formInstanceId = "form-instance-id";
    const yesterday = format(startOfDay(subDays(new Date(),1)));

    const values =  {
      'encounter-datetime': yesterday,
    };

    const patient = {
      uuid: "some_patient_uuid"
    };

    const encounterType = {
      uuid: "some_encounter_type_uuid"
    };

    const expectedEncounterPost = {
      "encounterDatetime": yesterday,
      "encounterType": "some_encounter_type_uuid",
      "patient": "some_patient_uuid"
    };

    sagaTester.dispatch(formActions.formSubmitted( {
      values: values,
      formId: "form-id",
      formInstanceId: formInstanceId,
      patient: patient,
      encounterType: encounterType,
      location: location,
      formSubmittedActionCreator:
      formSubmittedActionCreator,
      timestampNewEncounterIfCurrentDay: true
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.createEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);
  });

});
