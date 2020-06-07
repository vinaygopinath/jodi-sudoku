import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { PlayerType } from "../../models/player/PlayerType";
import { SinglePlayerMode } from "../../models/player/SinglePlayerMode";
import { TwoPlayerMode } from "../../models/player/TwoPlayerMode";

export const SELECT_DIFFICULTY_LEVEL = 'SELECT_DIFFICULTY_LEVEL';
export const SELECT_PLAYER_TYPE = 'SELECT_PLAYER_TYPE';
export const SELECT_SINGLE_PLAYER_MODE = 'SELECT_SINGLE_PLAYER_MODE';
export const SELECT_TWO_PLAYER_MODE = 'SELECT_TWO_PLAYER_MODE';

interface SelectDifficultyLevelAction {
  type: typeof SELECT_DIFFICULTY_LEVEL,
  payload: DifficultyLevel
}

interface SelectPlayerTypeAction {
  type: typeof SELECT_PLAYER_TYPE,
  payload: PlayerType
}

interface SelectSinglePlayerMode {
  type: typeof SELECT_SINGLE_PLAYER_MODE
  payload: SinglePlayerMode
}

interface SelectTwoPlayerMode {
  type: typeof SELECT_TWO_PLAYER_MODE
  payload: TwoPlayerMode
}

export type PlayerActionTypes = SelectDifficultyLevelAction | SelectPlayerTypeAction | SelectSinglePlayerMode | SelectTwoPlayerMode

export interface PlayerState {
  difficultyLevel: DifficultyLevel | null,
  playerType: PlayerType | null,
  singlePlayerMode: SinglePlayerMode | null,
  twoPlayerMode: TwoPlayerMode | null
}