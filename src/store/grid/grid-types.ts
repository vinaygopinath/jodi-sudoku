import { Action } from "../../models/common/Action";
import { ArrowKey } from "../../utils/KeyboardUtils";
import { getCellKey } from "../../utils/SudokuUtils";
export const SET_VALUE_OF_ACTIVE_CELL = 'SET_VALUE_OF_ACTIVE_CELL'
export const SET_SELECTED_CELL_VALUE = 'SET_SELECTED_CELL_VALUE'
export const CLEAR_CELL_VALUE = 'CLEAR_CELL_VALUE'
export const CHANGE_CELL_FOCUS = 'CHANGE_CELL_FOCUS'
export const MOVE_CELL_FOCUS_BY_ARROW_KEY = 'MOVE_CELL_FOCUS_BY_ARROW_KEY'
export const INITIALISE_CELL = 'INITIALISE_CELL'
export const RESET_CELL = 'RESET_CELL'
/**
 * 1 to 9 are the valid values
 */
export type CellValueRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type RowRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface CellState {
  value: CellValueRange | null,
  active?: boolean,
  initial?: boolean,
  highlighted?: boolean,
  invalid?: boolean
}

export interface SetActiveCellValueAction extends Action {
  type: typeof SET_VALUE_OF_ACTIVE_CELL,
  payload: {
    value: CellValueRange
  }
}

export interface SetSelectedCellValueAction extends Action {
  type: typeof SET_SELECTED_CELL_VALUE,
  payload: {
    value: CellValueRange,
    row: RowRange,
    column: ColumnRange
  }
}

export interface ClearCellValueAction extends Action {
  type: typeof CLEAR_CELL_VALUE
}

export interface InitialiseCellAction extends Action {
  type: typeof INITIALISE_CELL,
  payload: {
    row: RowRange,
    column: ColumnRange,
    value: CellValueRange | null
  }
}

export interface ResetCellAction extends Action {
  type: typeof RESET_CELL,
  payload: {
    row: RowRange,
    column: ColumnRange
  }
}

export interface ChangeCellFocusAction extends Action {
  type: typeof CHANGE_CELL_FOCUS,
  payload: {
    row: RowRange,
    column: ColumnRange,
    isActive: boolean
  }
}

export interface MoveCellFocusByArrowKeyAction extends Action {
  type: typeof MOVE_CELL_FOCUS_BY_ARROW_KEY,
  payload: {
    arrowKey: ArrowKey
  }
}

export type GridActionTypes = SetActiveCellValueAction | SetSelectedCellValueAction | ClearCellValueAction | ChangeCellFocusAction | MoveCellFocusByArrowKeyAction | InitialiseCellAction | ResetCellAction

export type CellRowColumnKeyType = "cell_row1_column1" | "cell_row1_column2" | "cell_row1_column3" | "cell_row1_column4" | "cell_row1_column5" | "cell_row1_column6" | "cell_row1_column7" | "cell_row1_column8" | "cell_row1_column9" | "cell_row2_column1" | "cell_row2_column2" | "cell_row2_column3" | "cell_row2_column4" | "cell_row2_column5" | "cell_row2_column6" | "cell_row2_column7" | "cell_row2_column8" | "cell_row2_column9" | "cell_row3_column1" | "cell_row3_column2" | "cell_row3_column3" | "cell_row3_column4" | "cell_row3_column5" | "cell_row3_column6" | "cell_row3_column7" | "cell_row3_column8" | "cell_row3_column9" | "cell_row4_column1" | "cell_row4_column2" | "cell_row4_column3" | "cell_row4_column4" | "cell_row4_column5" | "cell_row4_column6" | "cell_row4_column7" | "cell_row4_column8" | "cell_row4_column9" | "cell_row5_column1" | "cell_row5_column2" | "cell_row5_column3" | "cell_row5_column4" | "cell_row5_column5" | "cell_row5_column6" | "cell_row5_column7" | "cell_row5_column8" | "cell_row5_column9" | "cell_row6_column1" | "cell_row6_column2" | "cell_row6_column3" | "cell_row6_column4" | "cell_row6_column5" | "cell_row6_column6" | "cell_row6_column7" | "cell_row6_column8" | "cell_row6_column9" | "cell_row7_column1" | "cell_row7_column2" | "cell_row7_column3" | "cell_row7_column4" | "cell_row7_column5" | "cell_row7_column6" | "cell_row7_column7" | "cell_row7_column8" | "cell_row7_column9" | "cell_row8_column1" | "cell_row8_column2" | "cell_row8_column3" | "cell_row8_column4" | "cell_row8_column5" | "cell_row8_column6" | "cell_row8_column7" | "cell_row8_column8" | "cell_row8_column9" | "cell_row9_column1" | "cell_row9_column2" | "cell_row9_column3" | "cell_row9_column4" | "cell_row9_column5" | "cell_row9_column6" | "cell_row9_column7" | "cell_row9_column8" | "cell_row9_column9"
export const CellRowColumnKeys: Array<CellRowColumnKeyType> = ["cell_row1_column1", "cell_row1_column2", "cell_row1_column3", "cell_row1_column4", "cell_row1_column5", "cell_row1_column6", "cell_row1_column7", "cell_row1_column8", "cell_row1_column9", "cell_row2_column1", "cell_row2_column2", "cell_row2_column3", "cell_row2_column4", "cell_row2_column5", "cell_row2_column6", "cell_row2_column7", "cell_row2_column8", "cell_row2_column9", "cell_row3_column1", "cell_row3_column2", "cell_row3_column3", "cell_row3_column4", "cell_row3_column5", "cell_row3_column6", "cell_row3_column7", "cell_row3_column8", "cell_row3_column9", "cell_row4_column1", "cell_row4_column2", "cell_row4_column3", "cell_row4_column4", "cell_row4_column5", "cell_row4_column6", "cell_row4_column7", "cell_row4_column8", "cell_row4_column9", "cell_row5_column1", "cell_row5_column2", "cell_row5_column3", "cell_row5_column4", "cell_row5_column5", "cell_row5_column6", "cell_row5_column7", "cell_row5_column8", "cell_row5_column9", "cell_row6_column1", "cell_row6_column2", "cell_row6_column3", "cell_row6_column4", "cell_row6_column5", "cell_row6_column6", "cell_row6_column7", "cell_row6_column8", "cell_row6_column9", "cell_row7_column1", "cell_row7_column2", "cell_row7_column3", "cell_row7_column4", "cell_row7_column5", "cell_row7_column6", "cell_row7_column7", "cell_row7_column8", "cell_row7_column9", "cell_row8_column1", "cell_row8_column2", "cell_row8_column3", "cell_row8_column4", "cell_row8_column5", "cell_row8_column6", "cell_row8_column7", "cell_row8_column8", "cell_row8_column9", "cell_row9_column1", "cell_row9_column2", "cell_row9_column3", "cell_row9_column4", "cell_row9_column5", "cell_row9_column6", "cell_row9_column7", "cell_row9_column8", "cell_row9_column9"]

export interface GridState {
  cell_row1_column1: CellState,
  cell_row1_column2: CellState,
  cell_row1_column3: CellState,
  cell_row1_column4: CellState,
  cell_row1_column5: CellState,
  cell_row1_column6: CellState,
  cell_row1_column7: CellState,
  cell_row1_column8: CellState,
  cell_row1_column9: CellState,
  cell_row2_column1: CellState,
  cell_row2_column2: CellState,
  cell_row2_column3: CellState,
  cell_row2_column4: CellState,
  cell_row2_column5: CellState,
  cell_row2_column6: CellState,
  cell_row2_column7: CellState,
  cell_row2_column8: CellState,
  cell_row2_column9: CellState,
  cell_row3_column1: CellState,
  cell_row3_column2: CellState,
  cell_row3_column3: CellState,
  cell_row3_column4: CellState,
  cell_row3_column5: CellState,
  cell_row3_column6: CellState,
  cell_row3_column7: CellState,
  cell_row3_column8: CellState,
  cell_row3_column9: CellState,
  cell_row4_column1: CellState,
  cell_row4_column2: CellState,
  cell_row4_column3: CellState,
  cell_row4_column4: CellState,
  cell_row4_column5: CellState,
  cell_row4_column6: CellState,
  cell_row4_column7: CellState,
  cell_row4_column8: CellState,
  cell_row4_column9: CellState,
  cell_row5_column1: CellState,
  cell_row5_column2: CellState,
  cell_row5_column3: CellState,
  cell_row5_column4: CellState,
  cell_row5_column5: CellState,
  cell_row5_column6: CellState,
  cell_row5_column7: CellState,
  cell_row5_column8: CellState,
  cell_row5_column9: CellState,
  cell_row6_column1: CellState,
  cell_row6_column2: CellState,
  cell_row6_column3: CellState,
  cell_row6_column4: CellState,
  cell_row6_column5: CellState,
  cell_row6_column6: CellState,
  cell_row6_column7: CellState,
  cell_row6_column8: CellState,
  cell_row6_column9: CellState,
  cell_row7_column1: CellState,
  cell_row7_column2: CellState,
  cell_row7_column3: CellState,
  cell_row7_column4: CellState,
  cell_row7_column5: CellState,
  cell_row7_column6: CellState,
  cell_row7_column7: CellState,
  cell_row7_column8: CellState,
  cell_row7_column9: CellState,
  cell_row8_column1: CellState,
  cell_row8_column2: CellState,
  cell_row8_column3: CellState,
  cell_row8_column4: CellState,
  cell_row8_column5: CellState,
  cell_row8_column6: CellState,
  cell_row8_column7: CellState,
  cell_row8_column8: CellState,
  cell_row8_column9: CellState,
  cell_row9_column1: CellState,
  cell_row9_column2: CellState,
  cell_row9_column3: CellState,
  cell_row9_column4: CellState,
  cell_row9_column5: CellState,
  cell_row9_column6: CellState,
  cell_row9_column7: CellState,
  cell_row9_column8: CellState,
  cell_row9_column9: CellState
}

export function getCellStateKeyFromData(data: { row: RowRange, column: ColumnRange, [key: string]: any}): keyof GridState {
  return getCellKey(data.row, data.column)
}

export function getCellStateFromKey(state: GridState, key: string): CellState {
  if (!isCellRowColumnKey(key)) {
    throw Error(`Invalid key ${key}. Expected a key of the format "cell_row(num1)_column(num2)"`)
  }

  return state[key]
}

export function getCellState(state: GridState, row: RowRange, column: ColumnRange): CellState {
  return state[getCellKey(row, column)]
}

function isCellRowColumnKey(key: string): key is CellRowColumnKeyType {
  return (CellRowColumnKeys as string[]).includes(key)
}