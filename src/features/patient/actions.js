import CHECK_IN_TYPES from './types';

const checkInSubmitted = (values, patient, visitType, encounterType, locationType, formSubmittedActionCreator) => ( {
  type: CHECK_IN_TYPES.SUBMIT,
  values: values,
  patient: patient,
  visitType: visitType,
  encounterType: encounterType,
  locationType: locationType,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const checkInSucceeded = (values) => ( {
  type: CHECK_IN_TYPES.SUCCEEDED,
  values: values
});


const checkInFailed = (values) => ( {
  type: CHECK_IN_TYPES.FAILED,
  values: values
});

export default {
  checkInSubmitted,
  checkInSucceeded,
  checkInFailed
};
