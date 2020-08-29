import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { SudokuPuzzle } from "../models/sudoku/SudokuPuzzle";
import sudoku from 'sudoku-umd';
import { RowRange, ColumnRange, CellRowColumnKeyType, CellValueRange } from "../store/grid/grid-types";

export function generateSudokuPuzzle(difficultyLevel: DifficultyLevel): SudokuPuzzle {
  const sudokuString = sudoku.generate(DifficultyLevel[difficultyLevel].toLowerCase())
  // Force Typescript to treat the empty {} as SudokuPuzzle
  // We'll fill in the properties in the loop
  const puzzle: SudokuPuzzle = {} as SudokuPuzzle
  for (let index = 0; index < sudokuString.length; index++) {
    const { row, column } = getRowAndColumnFromIndex(index)

    const value = parseInt(sudokuString.charAt(index))
    puzzle[getCellKey(row, column)] = value!! ? value as CellValueRange : null
  }

  return puzzle
}

export function getCellKey(row: RowRange, column: ColumnRange): CellRowColumnKeyType {
  return `cell_row${row}_column${column}` as CellRowColumnKeyType
}

export function getRowAndColumnFromCellKey(key: CellRowColumnKeyType): { row: RowRange, column: ColumnRange } {
  const matches = key.match(/\d/g)
  if (!matches || matches.length !== 2) {
    throw Error(`Invalid key ${key}`)
  }
  return { row: parseInt(matches[0]) as RowRange, column: parseInt(matches[1]) as ColumnRange }
}

export function getRowAndColumnFromIndex(index: number): { row: RowRange, column: ColumnRange } {
  const row = ((index === 0) ? 0 : Math.floor(index / 9)) + 1 as RowRange
  const column = (index % 9) + 1 as ColumnRange

  return { row, column }
}