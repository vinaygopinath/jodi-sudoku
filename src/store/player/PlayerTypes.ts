import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { Player } from "../../models/player/Player";
import { Action } from "../../models/common/Action";

export const SELECT_MULTIPLAYER_GAME_TYPE = 'SELECT_TWO_PLAYER_GAME_TYPE';
export const RESET_PLAYER = 'RESET_PLAYER'

interface SelectMultiplayerGameType extends Action {
  type: typeof SELECT_MULTIPLAYER_GAME_TYPE
  payload: MultiplayerGameType
}

interface ResetPlayerAction extends Action {
  type: typeof RESET_PLAYER
}

export type PlayerActionTypes = SelectMultiplayerGameType | ResetPlayerAction

export interface PlayerState {
  onlinePlayer: Player | null,
  multiplayerGameType: MultiplayerGameType | null
}