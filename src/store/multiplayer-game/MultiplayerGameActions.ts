import { DifficultyLevel } from "../../models/player/DifficultyLevel"
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType"
import {
  CLEAR_DIFFICULTY_LEVEL,
  CLEAR_GAME_TYPE,
  CREATE_ROOM,
  MultiplayerGameActionTypes,
  SELECT_DIFFICULTY_LEVEL,
  SELECT_GAME_TYPE,
} from "./MultiplayerGameTypes"

export function selectDifficultyLevel(
  difficultyLevel: DifficultyLevel
): MultiplayerGameActionTypes {
  return {
    type: SELECT_DIFFICULTY_LEVEL,
    payload: difficultyLevel,
  }
}

export function clearDifficultyLevel(): MultiplayerGameActionTypes {
  return {
    type: CLEAR_DIFFICULTY_LEVEL
  }
}

export function selectGameType(
  gameType: MultiplayerGameType
): MultiplayerGameActionTypes {
  return {
    type: SELECT_GAME_TYPE,
    payload: gameType
  }
}

export function clearGameType(): MultiplayerGameActionTypes {
  return {
    type: CLEAR_GAME_TYPE
  }
}

export function createRoom(name: string, link: string, description: string | null): MultiplayerGameActionTypes {
  return {
    type: CREATE_ROOM,
    payload: {
      name,
      link,
      description
    }
  }
}
