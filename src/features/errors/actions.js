import ERROR_TYPES from './types';

const clearErrors = () => ( {
  type: ERROR_TYPES.CLEAR_ERRORS
});

export default {
  clearErrors
};

