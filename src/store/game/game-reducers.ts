import { GameActionTypes, GameState, CellState } from "./game-types"

function getInitialCellState(): CellState {
  return {
    value: null,
    active: false,
    highlighted: false,
    invalid: false
  }
}

export const GAME_INITIAL_STATE: GameState = {
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

    default: return state
  }
}