import { RowRange, ColumnRange, CellValueRange, GridActionTypes, SET_VALUE_OF_ACTIVE_CELL, CHANGE_CELL_FOCUS, MOVE_CELL_FOCUS_BY_ARROW_KEY, CLEAR_CELL_VALUE, INITIALISE_CELL, SET_SELECTED_CELL_VALUE, RESET_CELL } from "./grid-types";
import { ArrowKey } from "../../utils/KeyboardUtils";

export function setValueOfActiveCell(value: CellValueRange): GridActionTypes {
  return {
    type: SET_VALUE_OF_ACTIVE_CELL,
    payload: {
      value: value
    }
  }
}

export function setSelectedCellValue(row: RowRange, column: ColumnRange, value: CellValueRange): GridActionTypes {
  return {
    type: SET_SELECTED_CELL_VALUE,
    payload: {
      row: row,
      column: column,
      value: value
    }
  }
}

export function initialiseCell(row: RowRange, column: ColumnRange, value: CellValueRange | null): GridActionTypes {
  return {
    type: INITIALISE_CELL,
    payload: {
      row: row,
      column: column,
      value: value
    }
  }
}

export function clearCellValue(): GridActionTypes {
  return {
    type: CLEAR_CELL_VALUE
  }
}

export function resetCell(row: RowRange, column: ColumnRange): GridActionTypes {
  return {
    type: RESET_CELL,
    payload: {
      row: row,
      column: column
    }
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