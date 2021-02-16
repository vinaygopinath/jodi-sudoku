import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { PlayerType } from "../models/player/PlayerType";

export class SharedUtils {
  static getAppTitleResource(): string {
    return 'shared:shared_title'
  }

  static getPuzzleResource(): string {
    return 'shared:shared_puzzle'
  }

  public static getDifficultyLevelResource(difficultyLevel: DifficultyLevel | null): string {
    switch (difficultyLevel) {
      case DifficultyLevel.EASY: return 'shared:shared_difficulty_level_easy'
      case DifficultyLevel.MEDIUM: return 'shared:shared_difficulty_level_medium'
      case DifficultyLevel.HARD: return 'shared:shared_difficulty_level_hard'
      case DifficultyLevel.EXTREME: return 'shared:shared_difficulty_level_extreme'
      case null: return 'shared:shared_difficulty_level_unknown'
    }
  }

  public static getPlayerTypeResource(playerType: PlayerType | null): string {
    switch (playerType) {
      case PlayerType.SINGLE_PLAYER: return 'shared:shared_player_type_single'
      case PlayerType.TWO_PLAYER: return 'shared:shared_player_type_multi'
      case null: return 'shared:shared_player_type_unknown'
    }
  }
}