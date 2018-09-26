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
  ...data,
});

const formSubmitSucceeded = (formInstanceUuid,formSubmittedActionCreator) => ( {
  type: FORM_TYPES.SUBMIT_SUCCEEDED,
  formInstanceUuid: formInstanceUuid,
  formSubmittedActionCreator: formSubmittedActionCreator
});


const formSubmitFailed = (formInstanceUuid) => ( {
  type: FORM_TYPES.SUBMIT_FAILED,
  formInstanceUuid: formInstanceUuid,
});

const initializeForm = (formInstanceUuid, formId) => ( {
  type: FORM_TYPES.INITIALIZE_FORM,
  formInstanceUuid: formInstanceUuid,
  formId: formId
});

const destroyForm = (formInstanceUuid) => ({
  type: FORM_TYPES.DESTROY_FORM,
  formInstanceUuid: formInstanceUuid
});

const loadFormBackingEncounter = (formInstanceUuid, encounterUuid) => ( {
  type: FORM_TYPES.LOAD_FORM_BACKING_ENCOUNTER,
  formInstanceUuid: formInstanceUuid,
  encounterUuid: encounterUuid
});

const formBackingEncounterLoaded = (formInstanceUuid, encounter) => ( {
  type: FORM_TYPES.FORM_BACKING_ENCOUNTER_LOADED,
  formInstanceUuid: formInstanceUuid,
  encounter: encounter
});

const setFormState = (formInstanceId, state) => ( {
  type: FORM_TYPES.SET_FORM_STATE,
  formInstanceUuid: formInstanceId,
  state: state
});



export default {
  formSubmitted,
  formSubmitSucceeded,
  formSubmitFailed,
  initializeForm,
  destroyForm,
  loadFormBackingEncounter,
  formBackingEncounterLoaded,
  setFormState
};
