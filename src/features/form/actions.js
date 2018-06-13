import FORM_TYPES from './types';

const formSubmitted = (values, patient, encounterType) => ( {
  type: FORM_TYPES.SUBMIT,
  values: values,
  patient: patient,
  encounterType: encounterType
});

export default {
  formSubmitted
};
