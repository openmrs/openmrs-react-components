import gridActions from '../actions';
import GRID_TYPES from '../types';

// these are pretty straigthforward, potentially a bit overkill?

describe('grid actions', () => {

  it('should create grid ROW_SELECTED action', () => {
    const expectedAction = {
      type: GRID_TYPES.ROW_SELECTED,
      row: "patientRow"
    };
    expect(gridActions.rowSelected("patientRow")).toEqual(expectedAction);
  });

  it('should create grid CLEAR_SELECTED action', () => {
    const expectedAction = {
      type: GRID_TYPES.CLEAR_SELECTED
    };
    expect(gridActions.clearSelection()).toEqual(expectedAction);
  });

});
