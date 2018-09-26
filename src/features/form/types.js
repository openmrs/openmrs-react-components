import types from 'redux-types';

export default types('form', [
  'SUBMIT',
  'SUBMIT_FAILED',
  'SUBMIT_SUCCEEDED',
  'INITIALIZE_FORM',
  'DESTROY_FORM',
  'SET_FORM_STATE',
  'LOAD_FORM_BACKING_ENCOUNTER',
  'FORM_BACKING_ENCOUNTER_LOADED'
]);
