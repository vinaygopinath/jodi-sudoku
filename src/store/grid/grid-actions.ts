import { RowRange, ColumnRange, CellValueRange, GridActionTypes, ENTER_CELL_VALUE, CHANGE_CELL_FOCUS, MOVE_CELL_FOCUS_BY_ARROW_KEY, CLEAR_CELL_VALUE } from "./grid-types";
import { ArrowKey } from "../../utils/KeyboardUtils";

export function enterCellValue(value: CellValueRange): GridActionTypes {
  return {
    type: ENTER_CELL_VALUE,
    payload: {
      value: value
    }
  }
}

export function clearCellValue(): GridActionTypes {
  return {
    type: CLEAR_CELL_VALUE
  }
}

export function changeCellFocus(row: RowRange, column: ColumnRange, isActive: boolean): GridActionTypes {
  return {
    type: CHANGE_CELL_FOCUS,
    payload: {
      row: row,
      column: column,
      isActive: isActive
    }
  }
}

export function moveCellFocusByArrowKey(arrowKey: ArrowKey): GridActionTypes {
  return {
    type: MOVE_CELL_FOCUS_BY_ARROW_KEY,
    payload: {
      arrowKey: arrowKey
    }
  }
}