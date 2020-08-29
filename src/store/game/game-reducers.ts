import { GameState, GameActionTypes, GENERATE_SUDOKU_PUZZLE } from "./game-types";
import { Immutable } from "../../utils/types/immutable";

export const GAME_INITIAL_STATE: GameState = {
  initialised: false
}

export function gameReducer(state = GAME_INITIAL_STATE, action: GameActionTypes): GameState {
  switch (action.type) {
    case GENERATE_SUDOKU_PUZZLE: return computeStateAfterInitialising(state)
    default: return state
  }
}

function computeStateAfterInitialising(state: Immutable<GameState>): GameState {
  return {
    ...state,
    initialised: true
  }
}