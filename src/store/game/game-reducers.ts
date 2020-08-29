import { GameActionTypes, GameState, CellState, ENTER_CELL_VALUE, getCellStateKey, CellValueRange, RowRange, ColumnRange, CHANGE_CELL_FOCUS, CellRowColumnKeys, getCellStateFromKey, MOVE_CELL_FOCUS_BY_ARROW_KEY, CellRowColumnKeyType, CLEAR_CELL_VALUE } from "./game-types"
import { ArrowKey } from "../../utils/KeyboardUtils"
import { Immutable } from "../../utils/types/immutable"

const ROW_COLUMN_KEY_REGEX = /\d/g

function getInitialCellState(): CellState {
  return {
    value: null,
    active: false,
    highlighted: false,
    invalid: false,
    initial: false
  }
}

export const GAME_INITIAL_STATE: Immutable<GameState> = {
  cell_row1_column1: getInitialCellState(),
  cell_row1_column2: getInitialCellState(),
  cell_row1_column3: getInitialCellState(),
  cell_row1_column4: getInitialCellState(),
  cell_row1_column5: getInitialCellState(),
  cell_row1_column6: getInitialCellState(),
  cell_row1_column7: getInitialCellState(),
  cell_row1_column8: getInitialCellState(),
  cell_row1_column9: getInitialCellState(),
  cell_row2_column1: getInitialCellState(),
  cell_row2_column2: getInitialCellState(),
  cell_row2_column3: getInitialCellState(),
  cell_row2_column4: getInitialCellState(),
  cell_row2_column5: getInitialCellState(),
  cell_row2_column6: getInitialCellState(),
  cell_row2_column7: getInitialCellState(),
  cell_row2_column8: getInitialCellState(),
  cell_row2_column9: getInitialCellState(),
  cell_row3_column1: getInitialCellState(),
  cell_row3_column2: getInitialCellState(),
  cell_row3_column3: getInitialCellState(),
  cell_row3_column4: getInitialCellState(),
  cell_row3_column5: getInitialCellState(),
  cell_row3_column6: getInitialCellState(),
  cell_row3_column7: getInitialCellState(),
  cell_row3_column8: getInitialCellState(),
  cell_row3_column9: getInitialCellState(),
  cell_row4_column1: getInitialCellState(),
  cell_row4_column2: getInitialCellState(),
  cell_row4_column3: getInitialCellState(),
  cell_row4_column4: getInitialCellState(),
  cell_row4_column5: getInitialCellState(),
  cell_row4_column6: getInitialCellState(),
  cell_row4_column7: getInitialCellState(),
  cell_row4_column8: getInitialCellState(),
  cell_row4_column9: getInitialCellState(),
  cell_row5_column1: getInitialCellState(),
  cell_row5_column2: getInitialCellState(),
  cell_row5_column3: getInitialCellState(),
  cell_row5_column4: getInitialCellState(),
  cell_row5_column5: getInitialCellState(),
  cell_row5_column6: getInitialCellState(),
  cell_row5_column7: getInitialCellState(),
  cell_row5_column8: getInitialCellState(),
  cell_row5_column9: getInitialCellState(),
  cell_row6_column1: getInitialCellState(),
  cell_row6_column2: getInitialCellState(),
  cell_row6_column3: getInitialCellState(),
  cell_row6_column4: getInitialCellState(),
  cell_row6_column5: getInitialCellState(),
  cell_row6_column6: getInitialCellState(),
  cell_row6_column7: getInitialCellState(),
  cell_row6_column8: getInitialCellState(),
  cell_row6_column9: getInitialCellState(),
  cell_row7_column1: getInitialCellState(),
  cell_row7_column2: getInitialCellState(),
  cell_row7_column3: getInitialCellState(),
  cell_row7_column4: getInitialCellState(),
  cell_row7_column5: getInitialCellState(),
  cell_row7_column6: getInitialCellState(),
  cell_row7_column7: getInitialCellState(),
  cell_row7_column8: getInitialCellState(),
  cell_row7_column9: getInitialCellState(),
  cell_row8_column1: getInitialCellState(),
  cell_row8_column2: getInitialCellState(),
  cell_row8_column3: getInitialCellState(),
  cell_row8_column4: getInitialCellState(),
  cell_row8_column5: getInitialCellState(),
  cell_row8_column6: getInitialCellState(),
  cell_row8_column7: getInitialCellState(),
  cell_row8_column8: getInitialCellState(),
  cell_row8_column9: getInitialCellState(),
  cell_row9_column1: getInitialCellState(),
  cell_row9_column2: getInitialCellState(),
  cell_row9_column3: getInitialCellState(),
  cell_row9_column4: getInitialCellState(),
  cell_row9_column5: getInitialCellState(),
  cell_row9_column6: getInitialCellState(),
  cell_row9_column7: getInitialCellState(),
  cell_row9_column8: getInitialCellState(),
  cell_row9_column9: getInitialCellState()
}

export function gameReducer(state = GAME_INITIAL_STATE, action: GameActionTypes): GameState {
  switch (action.type) {
    case ENTER_CELL_VALUE: return computeNewGameStateAfterValueChange(state, action.payload)
    case CLEAR_CELL_VALUE: return computeNewGameStateAfterClearCell(state)
    case CHANGE_CELL_FOCUS: return computeNewGameStateAfterFocusChange(state, action.payload)
    case MOVE_CELL_FOCUS_BY_ARROW_KEY: return computeNewGameStateOnArrowKey(state, action.payload.arrowKey)
    default: return state
  }
}

function computeNewGameStateAfterValueChange(state: GameState, data: Immutable<{ value: CellValueRange }>): Immutable<GameState> {
  const activeCellKeyAndState = getActiveCellKeyAndState(state)
  if (!activeCellKeyAndState || activeCellKeyAndState.activeCellState.initial) {
    // no active cell, or active cell is an unmodifiable initial cell. Do nothing
    return state
  }

  const { activeKey, activeCellState } = activeCellKeyAndState
  const { value } = data

  return {
    ...state,
    [activeKey]: changeCellValue(activeCellState, value)
  }
}

function computeNewGameStateAfterClearCell(state: Immutable<GameState>): Immutable<GameState> {
  const activeCellKeyAndState = getActiveCellKeyAndState(state)
  if (!activeCellKeyAndState || activeCellKeyAndState.activeCellState.initial) {
    // no active cell, or active cell is an unmodifiable initial cell. Do nothing
    return state
  }

  const { activeKey, activeCellState } = activeCellKeyAndState
  return {
    ...state,
    [activeKey]: changeCellValue(activeCellState, null)
  }
}

function computeNewGameStateAfterFocusChange(state: GameState, data: Immutable<{ row: RowRange, column: ColumnRange, isActive: boolean }>): Immutable<GameState> {
  const updatedCellKey = getCellStateKey(data.row, data.column)

  const updatedState: GameState = {
    ...state,
    [updatedCellKey]: toggleCellActive(getCellStateFromKey(state, updatedCellKey), data.isActive)
  }

  getUpdatedPreviouslyActiveKeyAndCellStates(state).forEach(it => {
    updatedState[it.key] = it.updatedCellState
  })

  return updatedState
}

function computeNewGameStateOnArrowKey(state: Immutable<GameState>, arrowKey: ArrowKey) {
  const activeCellKeyAndState = getActiveCellKeyAndState(state)
  if (!activeCellKeyAndState) {
    return computeNewGameStateAfterFocusChange(state, { row: 1, column: 1, isActive: true })
  }

  const { row, column } = getRowAndColumnFromKey(activeCellKeyAndState.activeKey)
  let newActiveRow = row
  let newActiveColumn = column

  switch (arrowKey) {
    case ArrowKey.UP: {
      if (row === 1) {
        newActiveRow = 9
      } else {
        newActiveRow = (row - 1) as RowRange
      }
      break
    }
    case ArrowKey.DOWN: {
      if (row === 9) {
        newActiveRow = 1
      } else {
        newActiveRow = (row + 1) as RowRange
      }
      break
    }
    case ArrowKey.LEFT: {
      if (column === 1) {
        newActiveColumn = 9
      } else {
        newActiveColumn = (column - 1) as ColumnRange
      }
      break
    }
    case ArrowKey.RIGHT: {
      if (column === 9) {
        newActiveColumn = 1
      } else {
        newActiveColumn = (column + 1) as ColumnRange
      }
      break
    }
  }

  return computeNewGameStateAfterFocusChange(state, { row: newActiveRow, column: newActiveColumn, isActive: true })
}

function getActiveCellKeyAndState(state: Immutable<GameState>): Immutable<{ activeKey: CellRowColumnKeyType, activeCellState: CellState } | null> {
  const activeKey = CellRowColumnKeys.find(key => state[key].active)
  if (activeKey) {
    return { activeKey: activeKey, activeCellState: state[activeKey] }
  }

  return null
}

function toggleCellActive(cellState: CellState, isActive: boolean): Immutable<CellState> {
  return {
    ...cellState,
    active: isActive
  }
}

function changeCellValue(cellState: CellState, value: CellValueRange | null): Immutable<CellState> {
  return {
    ...cellState,
    value: value
  }
}

function getRowAndColumnFromKey(key: CellRowColumnKeyType): { row: RowRange, column: ColumnRange } {
  const matches = key.match(ROW_COLUMN_KEY_REGEX)
  if (matches == null || matches.length !== 2) {
    throw Error(`Invalid cell row column key type ${key}`)
  }

  return {
    row: parseInt(matches[0]) as RowRange,
    column: parseInt(matches[1]) as ColumnRange
  }
}

function getUpdatedPreviouslyActiveKeyAndCellStates(state: GameState): Array<{ key: keyof GameState, updatedCellState: CellState }> {
  return CellRowColumnKeys
    .filter(key => state[key].active)
    .map(key => ({ key: key, updatedCellState: toggleCellActive(state[key], false) }))
}