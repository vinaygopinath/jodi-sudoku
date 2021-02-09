import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { CellValueRange } from "../grid/grid-types";
import { GameState, GameActionTypes, GENERATE_SUDOKU_PUZZLE, PAUSE_SUDOKU_CLOCK, RESUME_SUDOKU_CLOCK, UPDATE_SUDOKU_CLOCK, CHANGE_VALUE_ENTRY_MODE, SET_ACTIVE_DIGIT, CLEAR_GAME } from "./game-types";

export const GAME_INITIAL_STATE: GameState = {
  initialised: false,
  isClockRunning: false,
  gameTime: 'T00:00:00',
  valueEntryMode: ValueEntryMode.DIGIT_FIRST,
  activeDigit: null
}

export function gameReducer(state = GAME_INITIAL_STATE, action: GameActionTypes): GameState {
  switch (action.type) {
    case GENERATE_SUDOKU_PUZZLE: return computeStateAfterInitialising(state)
    case PAUSE_SUDOKU_CLOCK: return computeStateAfterClockPauseOrResume(state, false)
    case RESUME_SUDOKU_CLOCK: return computeStateAfterClockPauseOrResume(state, true)
    case UPDATE_SUDOKU_CLOCK: return computeStateAfterClockUpdate(state, action.payload.time)
    case CHANGE_VALUE_ENTRY_MODE: return computeStateOnValueEntryModeChange(state, action.payload.newValueEntryMode)
    case SET_ACTIVE_DIGIT: return computeStateOnActiveDigitChange(state, action.payload.activeDigit)
    case CLEAR_GAME: return computeStateOnClearGame()
    default: return state
  }
}

function computeStateOnClearGame(): GameState {
  return GAME_INITIAL_STATE
}

function computeStateAfterInitialising(state: GameState): GameState {
  return {
    gameTime: 'T00:00:00',
    initialised: true,
    isClockRunning: true,
    valueEntryMode: ValueEntryMode.DIGIT_FIRST,
    activeDigit: null
  }
}

function computeStateAfterClockPauseOrResume(state: GameState, isRunning: boolean): GameState {
  return {
    ...state,
    isClockRunning: isRunning
  }
}

function computeStateAfterClockUpdate(state: GameState, updatedTime: string): GameState {
  return {
    ...state,
    gameTime: standardiseTime(updatedTime)
  }
}

function computeStateOnValueEntryModeChange(state: GameState, newValueEntryMode: ValueEntryMode): GameState {
  return {
    ...state,
    valueEntryMode: newValueEntryMode,
    activeDigit: null
  }
}

function computeStateOnActiveDigitChange(state: GameState, activeDigit: CellValueRange): GameState {
  return {
    ...state,
    activeDigit: activeDigit
  }
}

function standardiseTime(updatedTime: string): string {
  const [hour, min, second] = updatedTime.substr(1).split(":")

  return `T${padToTwoDigits(hour)}:${padToTwoDigits(min)}:${padToTwoDigits(second)}`
}

function padToTwoDigits(numberString: string): string {
  return numberString.padStart(2, '0')
}