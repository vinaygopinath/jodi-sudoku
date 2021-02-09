import { PlayerState, PlayerActionTypes, SELECT_DIFFICULTY_LEVEL, SELECT_PLAYER_TYPE, SELECT_SINGLE_PLAYER_MODE, SELECT_TWO_PLAYER_MODE, RESET_PLAYER } from "./player-types";

export const PLAYER_INITIAL_STATE: PlayerState = {
  difficultyLevel: null,
  playerType: null,
  singlePlayerMode: null,
  twoPlayerMode: null
}

export function playerReducer(state = PLAYER_INITIAL_STATE, action: PlayerActionTypes): PlayerState {
  switch (action.type) {
    case SELECT_DIFFICULTY_LEVEL: return {
      ...state,
      difficultyLevel: action.payload
    }
    case SELECT_PLAYER_TYPE: return {
      ...state,
      playerType: action.payload
    }
    case SELECT_SINGLE_PLAYER_MODE: return {
      ...state,
      singlePlayerMode: action.payload
    }
    case SELECT_TWO_PLAYER_MODE: return {
      ...state,
      twoPlayerMode: action.payload
    }
    case RESET_PLAYER: return {
      ...PLAYER_INITIAL_STATE
    }
    default: return state
  }
}