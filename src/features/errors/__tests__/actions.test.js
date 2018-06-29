import ERROR_TYPES from '../types';
import errorActions from '../actions';

describe('errors actions', () => {

  it('should create clear errors actio', () => {
    const expectedAction = {
      type: ERROR_TYPES.CLEAR_ERRORS
    };
    expect(errorActions.clearErrors()).toEqual(expectedAction);
  });



});
