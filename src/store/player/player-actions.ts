import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { PlayerActionTypes, RESET_PLAYER, SELECT_DIFFICULTY_LEVEL, SELECT_PLAYER_TYPE, SELECT_SINGLE_PLAYER_MODE, SELECT_TWO_PLAYER_MODE } from "./player-types";
import { PlayerType } from "../../models/player/PlayerType";
import { SinglePlayerMode } from "../../models/player/SinglePlayerMode";
import { TwoPlayerMode } from "../../models/player/TwoPlayerMode";

export class PlayerActions {

  public static selectDifficultyLevel(difficultyLevel: DifficultyLevel): PlayerActionTypes {
    return {
      type: SELECT_DIFFICULTY_LEVEL,
      payload: difficultyLevel
    }
  }

  public static selectPlayerType(playerType: PlayerType): PlayerActionTypes {
    return {
      type: SELECT_PLAYER_TYPE,
      payload: playerType
    }
  }

  public static selectSinglePlayerMode(singlePlayerMode: SinglePlayerMode): PlayerActionTypes {
    return {
      type: SELECT_SINGLE_PLAYER_MODE,
      payload: singlePlayerMode
    }
  }

  public static selectTwoPlayerMode(twoPlayerMode: TwoPlayerMode): PlayerActionTypes {
    return {
      type: SELECT_TWO_PLAYER_MODE,
      payload: twoPlayerMode
    }
  }

  public static resetPlayer(): PlayerActionTypes {
    return {
      type: RESET_PLAYER
    }
  }
}