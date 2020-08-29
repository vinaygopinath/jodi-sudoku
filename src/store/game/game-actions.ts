import { GameActionTypes, GENERATE_SUDOKU_PUZZLE } from "./game-types";

export function generateSudokuPuzzle(): GameActionTypes {
  return {
    type: GENERATE_SUDOKU_PUZZLE
  }
}