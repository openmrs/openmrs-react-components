import FORM_TYPES from './types';

const formSubmitted = (values, patient, encounterType, visit, formSubmittedActionCreator) => ( {
  type: FORM_TYPES.SUBMIT,
  values: values,
  patient: patient,
  encounterType: encounterType,
  visit: visit,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const formSubmitSucceeded = (formSubmittedActionCreator) => ( {
  type: FORM_TYPES.SUBMIT_SUCCEEDED,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const formSubmitFailed = (message) => ( {
  type: FORM_TYPES.SUBMIT_FAILED,
  error: {
    message: message
  }
});

export default {
  formSubmitted,
  formSubmitSucceeded,
  formSubmitFailed
};
