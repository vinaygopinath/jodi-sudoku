import { Action } from "../../models/common/Action";

export const GENERATE_SUDOKU_PUZZLE = 'GENERATE_SUDOKU_PUZZLE'
export const UPDATE_SUDOKU_CLOCK = 'UPDATE_SUDOKU_CLOCK'
export const RESUME_SUDOKU_CLOCK = 'RESUME_SUDOKU_CLOCK'
export const PAUSE_SUDOKU_CLOCK = 'PAUSE_SUDOKU_CLOCK'

export type GameActionTypes = GenerateSudokuPuzzleAction | UpdateSudokuClockAction | PauseSudokuClockAction | ResumeSudokuClockAction

interface GenerateSudokuPuzzleAction extends Action {
  type: typeof GENERATE_SUDOKU_PUZZLE
}

interface UpdateSudokuClockAction extends Action {
  type: typeof UPDATE_SUDOKU_CLOCK,
  payload: {
    time: string
  }
}

interface PauseSudokuClockAction extends Action {
  type: typeof PAUSE_SUDOKU_CLOCK
}

interface ResumeSudokuClockAction extends Action {
  type: typeof RESUME_SUDOKU_CLOCK
}

export interface GameState {
  initialised: boolean,
  gameTime: string,
  isClockRunning: boolean
}