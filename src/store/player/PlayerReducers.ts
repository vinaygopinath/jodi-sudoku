import { PlayerState, PlayerActionTypes, SELECT_MULTIPLAYER_GAME_TYPE, RESET_PLAYER } from "./PlayerTypes";

export const PLAYER_INITIAL_STATE: PlayerState = {
  onlinePlayer: null,
  multiplayerGameType: null
}

export function playerReducer(state = PLAYER_INITIAL_STATE, action: PlayerActionTypes | null): PlayerState {
  switch (action?.type) {
    case SELECT_MULTIPLAYER_GAME_TYPE: return {
      ...state,
      multiplayerGameType: action.payload
    }
    case RESET_PLAYER: return {
      ...PLAYER_INITIAL_STATE
    }
    default: return state
  }
}