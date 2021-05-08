import { Action } from "../../models/common/Action";
import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { Player } from "../../models/player/Player";
import { Room } from "../../models/room/Room";

export const SELECT_DIFFICULTY_LEVEL = 'SELECT_MULTIPLAYER_DIFFICULTY_LEVEL';
export const CLEAR_DIFFICULTY_LEVEL = 'CLEAR_MULTIPLAYER_DIFFICULTY_LEVEL';
export const SELECT_GAME_TYPE = 'SELECT_MULTIPLAYER_GAME_TYPE';
export const CLEAR_GAME_TYPE = 'CLEAR_MULTIPLAYER_GAME_TYPE';
export const CREATE_ROOM = 'CREATE_ROOM'

export type MultiplayerGameActionTypes = SelectDifficultyLevelAction | SelectGameTypeAction | ClearDifficultyLevelAction | ClearGameTypeAction | CreateRoomAction

export interface SelectDifficultyLevelAction extends Action {
  type: typeof SELECT_DIFFICULTY_LEVEL,
  payload: DifficultyLevel
}

export interface SelectGameTypeAction extends Action {
  type: typeof SELECT_GAME_TYPE,
  payload: MultiplayerGameType
}

export interface ClearDifficultyLevelAction extends Action {
  type: typeof CLEAR_DIFFICULTY_LEVEL
}

export interface ClearGameTypeAction extends Action {
  type: typeof CLEAR_GAME_TYPE
}

export interface CreateRoomAction extends Action {
  type: typeof CREATE_ROOM
  payload: {
    name: string,
    link: string,
    description: string | null
  }
}

export interface MultiplayerGameState {
  room: Room | null,
  difficultyLevel: DifficultyLevel | null,
  gameType: MultiplayerGameType | null,
  otherPlayers: Player[] | null
}