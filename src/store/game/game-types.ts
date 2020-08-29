import { Action } from "../../models/common/Action";

export const GENERATE_SUDOKU_PUZZLE = 'GENERATE_SUDOKU_PUZZLE'

export type GameActionTypes = GenerateSudokuPuzzleAction

interface GenerateSudokuPuzzleAction extends Action {
  type: typeof GENERATE_SUDOKU_PUZZLE
}

export interface GameState {
  initialised: boolean
}