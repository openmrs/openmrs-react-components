import formActions from '../actions';
import FORM_TYPES from '../types';

describe('form actions', () => {

  it('should create action for form submit submitted', () => {

    const patient = {
      uuid: "some_uuid"
    };

    const encounterType = {
      uuid: "some_uuid"
    };

    const visit = {
      uuid: "some_uuid"
    };

    const formSubmittedActionCreator = jest.fn();

    const expectedAction = {
      type: FORM_TYPES.SUBMIT,
      values: "some_values",
      formInstanceId: "some_form_id",
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator: formSubmittedActionCreator
    };

    expect(formActions.formSubmitted({
      values: "some_values",
      formInstanceId: "some_form_id",
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator: formSubmittedActionCreator
    })).toEqual(expectedAction);

  });

  it('should create action for form submit succeeeded', () => {

    const formSubmittedActionCreator = jest.fn();

    const expectedAction = {
      type: FORM_TYPES.SUBMIT_SUCCEEDED,
      formInstanceId: "some_form_id",
      formSubmittedActionCreator: formSubmittedActionCreator
    };

    expect(formActions.formSubmitSucceeded("some_form_id", formSubmittedActionCreator)).toEqual(expectedAction);

  });

  it('should create action for form submit failed', () => {

    const expectedAction = {
      type: FORM_TYPES.SUBMIT_FAILED,
      formInstanceId: "some_form_id",
    };
    expect(formActions.formSubmitFailed("some_form_id")).toEqual(expectedAction);

  });

});
