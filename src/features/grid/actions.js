import GRID_TYPES from './types';

const rowSelected = (row) => ( {
  type: GRID_TYPES.ROW_SELECTED,
  row: row
} );
const clearSelection = () => ( {
  type: GRID_TYPES.CLEAR_SELECTED
} );

export default {
  rowSelected,
  clearSelection
};
