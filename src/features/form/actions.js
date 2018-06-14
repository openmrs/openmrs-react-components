import FORM_TYPES from './types';

const formSubmitted = (values, patient, encounterType, visit) => ( {
  type: FORM_TYPES.SUBMIT,
  values: values,
  patient: patient,
  encounterType: encounterType,
  visit: visit
});

const formSubmitSucceeded = (values) => ( {
  type: FORM_TYPES.SUBMIT_SUCCEEDED,
  values: values
});


const formSubmitFailed = (values) => ( {
  type: FORM_TYPES.SUBMIT_FAILED,
  values: values
});

export default {
  formSubmitted,
  formSubmitSucceeded,
  formSubmitFailed
};
