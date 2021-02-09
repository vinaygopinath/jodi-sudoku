import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { PlayerType } from "../../models/player/PlayerType";
import { SinglePlayerMode } from "../../models/player/SinglePlayerMode";
import { TwoPlayerMode } from "../../models/player/TwoPlayerMode";
import { Action } from "../../models/common/Action";

export const SELECT_DIFFICULTY_LEVEL = 'SELECT_DIFFICULTY_LEVEL';
export const SELECT_PLAYER_TYPE = 'SELECT_PLAYER_TYPE';
export const SELECT_SINGLE_PLAYER_MODE = 'SELECT_SINGLE_PLAYER_MODE';
export const SELECT_TWO_PLAYER_MODE = 'SELECT_TWO_PLAYER_MODE';
export const RESET_PLAYER = 'RESET_PLAYER'

interface SelectDifficultyLevelAction extends Action {
  type: typeof SELECT_DIFFICULTY_LEVEL,
  payload: DifficultyLevel
}

interface SelectPlayerTypeAction extends Action {
  type: typeof SELECT_PLAYER_TYPE,
  payload: PlayerType
}

interface SelectSinglePlayerMode extends Action {
  type: typeof SELECT_SINGLE_PLAYER_MODE
  payload: SinglePlayerMode
}

interface SelectTwoPlayerMode extends Action {
  type: typeof SELECT_TWO_PLAYER_MODE
  payload: TwoPlayerMode
}

interface ResetPlayerAction extends Action {
  type: typeof RESET_PLAYER
}

export type PlayerActionTypes = SelectDifficultyLevelAction | SelectPlayerTypeAction | SelectSinglePlayerMode | SelectTwoPlayerMode | ResetPlayerAction

export interface PlayerState {
  difficultyLevel: DifficultyLevel | null,
  playerType: PlayerType | null,
  singlePlayerMode: SinglePlayerMode | null,
  twoPlayerMode: TwoPlayerMode | null
}