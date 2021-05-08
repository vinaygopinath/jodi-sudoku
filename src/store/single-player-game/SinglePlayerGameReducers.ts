import { ValueEntryMode } from "../../models/game/ValueEntryMode"
import { CellValueRange } from "../grid/GridTypes"
import { Immutable } from "../../utils/types/immutable"
import {
  SinglePlayerGameState,
  SinglePlayerGameActionTypes,
  GENERATE_SUDOKU_PUZZLE,
  PAUSE_SUDOKU_CLOCK,
  RESUME_SUDOKU_CLOCK,
  UPDATE_SUDOKU_CLOCK,
  CHANGE_VALUE_ENTRY_MODE,
  SET_ACTIVE_DIGIT,
  CLEAR_GAME,
  TOGGLE_GAME_COMPLETED,
  TOGGLE_GAME_SOLVED,
  SELECT_DIFFICULTY_LEVEL,
} from "./SinglePlayerGameTypes"
import { DifficultyLevel } from "../../models/player/DifficultyLevel"

export const SINGLE_PLAYER_GAME_INITIAL_STATE: SinglePlayerGameState = {
  initialised: false,
  isClockRunning: false,
  gameTime: "T00:00:00",
  difficultyLevel: null,
  valueEntryMode: ValueEntryMode.DIGIT_FIRST,
  activeDigit: null,
  isCompleted: false,
  isSolved: false,
}

export function singlePlayerGameReducer(
  state = SINGLE_PLAYER_GAME_INITIAL_STATE,
  action: SinglePlayerGameActionTypes | null
): SinglePlayerGameState {
  if (!action) {
    return state
  }

  switch (action.type) {
    case GENERATE_SUDOKU_PUZZLE:
      return computeStateAfterInitialising(state)
    case SELECT_DIFFICULTY_LEVEL:
      return processDifficultyLevelSelection(state, action.payload)
    case PAUSE_SUDOKU_CLOCK:
      return computeStateAfterClockPauseOrResume(state, false)
    case RESUME_SUDOKU_CLOCK:
      return computeStateAfterClockPauseOrResume(state, true)
    case UPDATE_SUDOKU_CLOCK:
      return computeStateAfterClockUpdate(state, action.payload.time)
    case CHANGE_VALUE_ENTRY_MODE:
      return computeStateOnValueEntryModeChange(
        state,
        action.payload.newValueEntryMode
      )
    case SET_ACTIVE_DIGIT:
      return computeStateOnActiveDigitChange(state, action.payload.activeDigit)
    case CLEAR_GAME:
      return computeStateOnClearGame()
    case TOGGLE_GAME_COMPLETED:
      return processToggleCompletedStateChange(state, action.payload)
    case TOGGLE_GAME_SOLVED:
      return processToggleSolvedStateChange(state, action.payload)
    default:
      return state
  }
}

function processDifficultyLevelSelection(
  state: SinglePlayerGameState,
  difficultyLevel: DifficultyLevel
): SinglePlayerGameState {
  return {
    ...state,
    difficultyLevel: difficultyLevel,
  }
}

function processToggleCompletedStateChange(
  state: Immutable<SinglePlayerGameState>,
  { isGameCompleted }: Immutable<{ isGameCompleted: boolean }>
): SinglePlayerGameState {
  return {
    ...state,
    isCompleted: isGameCompleted,
  }
}

function processToggleSolvedStateChange(
  state: Immutable<SinglePlayerGameState>,
  { isGameSolved }: Immutable<{ isGameSolved: boolean }>
): SinglePlayerGameState {
  return {
    ...state,
    isSolved: isGameSolved,
  }
}

function computeStateOnClearGame(): SinglePlayerGameState {
  return SINGLE_PLAYER_GAME_INITIAL_STATE
}

function computeStateAfterInitialising(
  state: SinglePlayerGameState
): SinglePlayerGameState {
  return {
    gameTime: "T00:00:00",
    initialised: true,
    isClockRunning: true,
    difficultyLevel: state.difficultyLevel,
    valueEntryMode: ValueEntryMode.DIGIT_FIRST,
    activeDigit: null,
    isCompleted: false,
    isSolved: false,
  }
}

function computeStateAfterClockPauseOrResume(
  state: SinglePlayerGameState,
  isRunning: boolean
): SinglePlayerGameState {
  return {
    ...state,
    isClockRunning: isRunning,
  }
}

function computeStateAfterClockUpdate(
  state: SinglePlayerGameState,
  updatedTime: string
): SinglePlayerGameState {
  return {
    ...state,
    gameTime: standardiseTime(updatedTime),
  }
}

function computeStateOnValueEntryModeChange(
  state: SinglePlayerGameState,
  newValueEntryMode: ValueEntryMode
): SinglePlayerGameState {
  return {
    ...state,
    valueEntryMode: newValueEntryMode,
    activeDigit: null,
  }
}

function computeStateOnActiveDigitChange(
  state: SinglePlayerGameState,
  activeDigit: CellValueRange
): SinglePlayerGameState {
  return {
    ...state,
    activeDigit: activeDigit,
  }
}

function standardiseTime(updatedTime: string): string {
  const [hour, min, second] = updatedTime.substr(1).split(":")

  return `T${padToTwoDigits(hour)}:${padToTwoDigits(min)}:${padToTwoDigits(
    second
  )}`
}

function padToTwoDigits(numberString: string): string {
  return numberString.padStart(2, "0")
}
