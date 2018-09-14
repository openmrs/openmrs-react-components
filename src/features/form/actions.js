import FORM_TYPES from './types';

/**
 * Fields in data:
 *  values: form values from redux,
 *  formId: formId,
 *  patient: patient,
 *  encounter: existing encounter to back form (optional)
 *  encounterType: encounterType,
 *  visit: visit,
 *  formSubmittedActionCreator: formSubmittedActionCreator
 */
const formSubmitted = (data) => ( {
  type: FORM_TYPES.SUBMIT,
  ...data
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
