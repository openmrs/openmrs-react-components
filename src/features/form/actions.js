import FORM_TYPES from './types';

const formSubmitted = (values, formId, patient, encounterType, visit, formSubmittedActionCreator) => ( {
  type: FORM_TYPES.SUBMIT,
  values: values,
  formId: formId,
  patient: patient,
  encounterType: encounterType,
  visit: visit,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const formSubmitSucceeded = (formSubmittedActionCreator) => ( {
  type: FORM_TYPES.SUBMIT_SUCCEEDED,
  formSubmittedActionCreator: formSubmittedActionCreator
});


const formSubmitFailed = () => ( {
  type: FORM_TYPES.SUBMIT_FAILED
});

export default {
  formSubmitted,
  formSubmitSucceeded,
  formSubmitFailed
};
