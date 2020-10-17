import { GameActionTypes, GENERATE_SUDOKU_PUZZLE, UPDATE_SUDOKU_CLOCK, PAUSE_SUDOKU_CLOCK, RESUME_SUDOKU_CLOCK } from "./game-types";

export function generateSudokuPuzzle(): GameActionTypes {
  return {
    type: GENERATE_SUDOKU_PUZZLE
  }
}

export function updateSudokuClock(time: string): GameActionTypes {
  return {
    type: UPDATE_SUDOKU_CLOCK,
    payload: {
      time: time
    }
  }
}

export function pauseSudokuClock(): GameActionTypes {
  return {
    type: PAUSE_SUDOKU_CLOCK
  }
}

export function resumeSudokuClock(): GameActionTypes {
  return {
    type: RESUME_SUDOKU_CLOCK
  }
}