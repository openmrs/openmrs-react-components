import SagaTester from 'redux-saga-tester';
import formActions from '../actions';
import openmrsFormSagas from '../sagas';
import encounterRest from '../../../rest/encounterRest';
import obsRest from '../../../rest/obsRest';
import moment from "moment";

jest.mock('../../../rest/encounterRest');
jest.mock('../../../rest/obsRest');

let formSubmittedActionCreator;

describe('form sagas', () => {

  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(openmrsFormSagas);
    formSubmittedActionCreator = jest.fn(() => { return { type:'SOME_ACTION_TYPE' };});
    encounterRest.createEncounter = jest.fn(encounterRest.createEncounter);   // for some reason, we need to wrap this in jest.fn here, not in the mock itself
    encounterRest.updateEncounter = jest.fn(encounterRest.updateEncounter);
    obsRest.deleteObs = jest.fn(obsRest.deleteObs);
  });

  it('should create an encounter and issue formSubmittedActionCreator', () => {

    const formInstanceId = "form-instance-id";
    const date = moment().format();

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
      encounterRole: encounterRole,
      encounterType: encounterType,
      location: location,
      provider: provider,
      visit: visit,
      formSubmittedActionCreator:
      formSubmittedActionCreator
    } ));
    expect(encounterRest.createEncounter).toHaveBeenCalledTimes(1);
    expect(encounterRest.createEncounter.mock.calls[0][0]).toMatchObject(expectedEncounterPost);

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
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
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(0);
    expect(sagaTester.getCalledActions()).not.toContainEqual(formSubmittedActionCreator());
  });

  it('should handle form submitted action creator that is an array of creators', () => {

    const formInstanceId = "form-instance-id";

    const anotherFormSubmittedActionCreator = jest.fn(() => { return { type:'ANOTHER_ACTION_TYPE' };});

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
    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, [ formSubmittedActionCreator, anotherFormSubmittedActionCreator ]));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
    expect(anotherFormSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(anotherFormSubmittedActionCreator());
  });

  it('should update encounter and issue formSubmittedActionCreator', () => {

    const formInstanceId = "form-instance-id";
    const date = moment().format();

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

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
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

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });

  it('should not call delete obs for obs that is not previously exisitng', () => {

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

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });


  it('should not include encounter provider if no encounter role specified', () => {

    const formInstanceId = "form-instance-id";
    const date = moment().format();

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

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });

  it('should create an encounter with a nested obs group', () => {

    const formInstanceId = "form-instance-id";

    const date = moment().startOf('day').format();

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

    expect(sagaTester.getCalledActions()).toContainEqual(formActions.formSubmitSucceeded(formInstanceId, formSubmittedActionCreator));
    expect(sagaTester.getCalledActions()).not.toContainEqual(formActions.formSubmitFailed(formInstanceId));
    expect(formSubmittedActionCreator.mock.calls.length).toBe(1);
    expect(sagaTester.getCalledActions()).toContainEqual(formSubmittedActionCreator());
  });

});
