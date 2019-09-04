import FORM_TYPES from './types';

/**
 * Fields in data:
 *  values: form values from redux,
 *  formId: formId,
 *  patient: patient,
 *  encounter: existing encounter to back form (optional)
 *  encounterType: encounterType,
 *  visit: visit,
 *  manuallyExitSubmitMode: manuallyExitSubmitMode,
 *  formSubmittedActionCreator: formSubmittedActionCreator
 */
const formSubmitted = (data) => ( {
  type: FORM_TYPES.SUBMIT,
  ...data,
});

const formSubmitSucceeded = (formInstanceId,formSubmittedActionCreator, updatedEncounter) => ( {
  type: FORM_TYPES.SUBMIT_SUCCEEDED,
  formInstanceId: formInstanceId,
  formSubmittedActionCreator: formSubmittedActionCreator,
  encounter: updatedEncounter
});


const formSubmitFailed = (formInstanceId) => ( {
  type: FORM_TYPES.SUBMIT_FAILED,
  formInstanceId: formInstanceId,
});

const initializeForm = (formInstanceId, formId) => ( {
  type: FORM_TYPES.INITIALIZE_FORM,
  formInstanceId: formInstanceId,
  formId: formId
});

const destroyForm = (formInstanceId) => ({
  type: FORM_TYPES.DESTROY_FORM,
  formInstanceId: formInstanceId
});

const loadFormBackingEncounter = (formInstanceId, encounterUuid) => ( {
  type: FORM_TYPES.LOAD_FORM_BACKING_ENCOUNTER,
  formInstanceId: formInstanceId,
  encounterUuid: encounterUuid
});

const clearFormBackingEncounter = (formInstanceId) => ( {
  type: FORM_TYPES.CLEAR_FORM_BACKING_ENCOUNTER,
  formInstanceId: formInstanceId
});

const formBackingEncounterLoaded = (formInstanceId, encounter) => ( {
  type: FORM_TYPES.FORM_BACKING_ENCOUNTER_LOADED,
  formInstanceId: formInstanceId,
  encounter: encounter
});

const setFormState = (formInstanceId, state) => ( {
  type: FORM_TYPES.SET_FORM_STATE,
  formInstanceId: formInstanceId,
  state: state
});



export default {
  formSubmitted,
  formSubmitSucceeded,
  formSubmitFailed,
  initializeForm,
  destroyForm,
  loadFormBackingEncounter,
  clearFormBackingEncounter,
  formBackingEncounterLoaded,
  setFormState
};
