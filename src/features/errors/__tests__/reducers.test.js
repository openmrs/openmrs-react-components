import reducers from '../reducers';
import ERROR_TYPES from '../types';

describe('errors reducers', () => {

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual([]);
  });

  it('should add error to empty error state', () => {

    let state = reducers(undefined, {
      type: "ANY_TYPE",
      error: {
        message: "some_error"
      }
    });

    expect(state.length).toBe(1);
    expect(state).toContainEqual({ message: "some_error" });

  });

  it('should add error to existing error state', () => {

    let state = reducers([ {
      message: "some_error"
    }], {
      type: "ANY_TYPE",
      error: {
        message: "another_error"
      }
    });

    expect(state.length).toBe(2);
    expect(state).toContainEqual({ message: "some_error" });
    expect(state).toContainEqual({ message: "another_error" });

  });

  it('should ignore actions with no errors', () => {

    let state = reducers([ {
      message: "some_error"
    }], {
      type: "ANY_TYPE"
    });

    expect(state.length).toBe(1);
    expect(state).toContainEqual({ message: "some_error" });

  });

  it('should clear error state', () => {

    let state = reducers([ {
      message: "some_error"
    }], {
      type: ERROR_TYPES.CLEAR_ERRORS,
    });

    expect(state.length).toBe(0);
  });

});
