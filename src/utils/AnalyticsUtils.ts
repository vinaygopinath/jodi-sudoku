import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { PlayerType } from "../models/player/PlayerType";

const PROP_DIFFICULTY_LEVEL = 'difficulty_level'
const PROP_PLAYER_TYPE = 'player_type'

const EVENT_START_GAME = 'start_game'
const EVENT_SOLVE_GAME = 'solve_game'
const EVENT_ABANDON_GAME = 'abandon_game'
const EVENT_EXCEPTION = 'app_exception'

export class AnalyticsUtils {

  static logStartGame(
    playerType: PlayerType,
    difficultyLevel: DifficultyLevel
  ) {
    this.logEvent(
      EVENT_START_GAME,
      {
        ...this.getDifficultyLevelProp(difficultyLevel),
        ...this.getPlayerTypeProp(playerType)
      }
    )
  }

  static logSolveGame(
    playerType: PlayerType,
    difficultyLevel: DifficultyLevel
  ) {
    this.logEvent(
      EVENT_SOLVE_GAME,
      {
        ...this.getDifficultyLevelProp(difficultyLevel),
        ...this.getPlayerTypeProp(playerType)
      }
    )
  }

  static logAbandonGame(
    playerType: PlayerType,
    difficultyLevel: DifficultyLevel
  ) {
    this.logEvent(
      EVENT_ABANDON_GAME,
      {
        ...this.getDifficultyLevelProp(difficultyLevel),
        ...this.getPlayerTypeProp(playerType)
      }
    )
  }

  static logException(
    description: string,
    stacktrace: string | undefined = undefined,
    isFatal: boolean = false
  ) {
    this.logEvent(
      EVENT_EXCEPTION,
      {
        description: description,
        stacktrace: stacktrace,
        fatal: isFatal
      }
    )
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      console.error(description)
      if (stacktrace) {
        console.error(`Stacktrace = ${stacktrace}`)
      }
    }
  }

  private static getPlayerTypeProp(playerType: PlayerType): { [PROP_PLAYER_TYPE]: PlayerType } {
    return {
      [PROP_PLAYER_TYPE]: playerType
    }
  }

  private static getDifficultyLevelProp(difficultyLevel: DifficultyLevel): { [PROP_DIFFICULTY_LEVEL]: DifficultyLevel } {
    return {
      [PROP_DIFFICULTY_LEVEL]: difficultyLevel
    }
  }

  private static logEvent(eventName: string, properties: any | undefined) {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      console.log(`Log event: ${eventName} with properties: ${JSON.stringify(properties, null, 2)}`);
    } else {
      gtag('event', eventName, properties)
    }
  }
}