import { Action } from "../../models/common/Action";
export const ENTER_CELL_VALUE = 'ENTER_CELL_VALUE'
export const CLEAR_CELL_VALUE = 'CLEAR_CELL_VALUE'
/**
 * 1 to 9 are the valid values
 */
export const CellValueRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const RowRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface CellState {
  value: typeof CellValueRange | null,
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

export type GameActionTypes = EnterCellValueAction | ClearCellValueAction

export interface GameState {
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