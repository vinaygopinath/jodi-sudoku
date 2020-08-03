import { Action } from "../../models/common/Action";
export const ENTER_CELL_VALUE = 'ENTER_CELL_VALUE'
export const CLEAR_CELL_VALUE = 'CLEAR_CELL_VALUE'
/**
 * 1 to 9 are the valid values. 0 represents a cell with no value
 */
export const CellValueRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const RowRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface CellState {
  value: typeof CellValueRange,
  active?: Boolean,
  highlighted?: Boolean,
  invalid?: Boolean
}

interface EnterCellValueAction extends Action {
  type: typeof ENTER_CELL_VALUE,
  payload: typeof CellValueRange
}

interface ClearCellValueAction extends Action {
  type: typeof CLEAR_CELL_VALUE
  payload: typeof CellValueRange
}