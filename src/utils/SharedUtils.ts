import { DifficultyLevel } from "../models/player/DifficultyLevel";

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
}