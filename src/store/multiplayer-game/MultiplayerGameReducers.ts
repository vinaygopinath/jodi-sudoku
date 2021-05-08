import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { CLEAR_DIFFICULTY_LEVEL, CLEAR_GAME_TYPE, MultiplayerGameActionTypes, MultiplayerGameState, SELECT_DIFFICULTY_LEVEL, SELECT_GAME_TYPE } from "./MultiplayerGameTypes";

export const MULTIPLAYER_GAME_INITIAL_STATE: MultiplayerGameState = {
  room: null,
  difficultyLevel: null,
  gameType: null,
  otherPlayers: null
}

export function multiplayerGameReducer(
  state = MULTIPLAYER_GAME_INITIAL_STATE,
  action: MultiplayerGameActionTypes | null
): MultiplayerGameState {
  if (!action) {
    return state
  }

  switch (action.type) {
    case SELECT_DIFFICULTY_LEVEL:
      return processDifficultyLevelSelection(state, action.payload)
    case CLEAR_DIFFICULTY_LEVEL:
      return processClearDifficultyLevelSelection(state)
    case SELECT_GAME_TYPE:
      return processGameTypeSelection(state, action.payload)
    case CLEAR_GAME_TYPE:
      return processClearGameTypeSelection(state)
  }

  return state
}

function processDifficultyLevelSelection(state: MultiplayerGameState, difficultyLevel: DifficultyLevel): MultiplayerGameState {
  return {
    ...state,
    difficultyLevel: difficultyLevel
  }
}

function processClearDifficultyLevelSelection(state: MultiplayerGameState): MultiplayerGameState {
  return {
    ...state,
    difficultyLevel: null
  }
}

function processGameTypeSelection(state: MultiplayerGameState, gameType: MultiplayerGameType): MultiplayerGameState {
  return {
    ...state,
    gameType: gameType
  }
}

function processClearGameTypeSelection(state: MultiplayerGameState): MultiplayerGameState {
  return {
    ...state,
    gameType: null
  }
}