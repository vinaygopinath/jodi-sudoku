import { GameState, GameActionTypes, GENERATE_SUDOKU_PUZZLE, PAUSE_SUDOKU_CLOCK, RESUME_SUDOKU_CLOCK, UPDATE_SUDOKU_CLOCK } from "./game-types";

export const GAME_INITIAL_STATE: GameState = {
  initialised: false,
  isClockRunning: false,
  gameTime: 'T00:00:00'
}

export function gameReducer(state = GAME_INITIAL_STATE, action: GameActionTypes): GameState {
  switch (action.type) {
    case GENERATE_SUDOKU_PUZZLE: return computeStateAfterInitialising(state)
    case PAUSE_SUDOKU_CLOCK: return computeStateAfterClockPauseOrResume(state, false)
    case RESUME_SUDOKU_CLOCK: return computeStateAfterClockPauseOrResume(state, true)
    case UPDATE_SUDOKU_CLOCK: return computeStateAfterClockUpdate(state, action.payload.time)
    default: return state
  }
}

function computeStateAfterInitialising(state: GameState): GameState {
  return {
    gameTime: 'T00:00:00',
    initialised: true,
    isClockRunning: true
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

function standardiseTime(updatedTime: string): string {
  const [hour, min, second] = updatedTime.substr(1).split(":")

  return `T${padToTwoDigits(hour)}:${padToTwoDigits(min)}:${padToTwoDigits(second)}`
}

function padToTwoDigits(numberString: string): string {
  const number = Number.parseInt(numberString)
  if (number < 10) {
    return `0${number}`
  } else {
    return numberString
  }
}