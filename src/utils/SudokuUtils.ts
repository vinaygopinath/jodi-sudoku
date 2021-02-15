import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { SudokuPuzzle } from "../models/sudoku/SudokuPuzzle";
import sudoku from 'sudoku-umd';
import { RowRange, ColumnRange, CellRowColumnKeyType, CellValueRange, GridState } from "../store/grid/grid-types";

const MAX_UNIQUENESS_ATTEMPTS = 25

export function generateSudokuPuzzle(difficultyLevel: DifficultyLevel): SudokuPuzzle {
  const sudokuString = generateUniquePuzzleString(difficultyLevel)
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

function getDifficultyLevelString(difficultyLevel: DifficultyLevel): string | number {
  switch (difficultyLevel) {
    case DifficultyLevel.EASY: return 'easy';
    case DifficultyLevel.MEDIUM: return 'medium';
    case DifficultyLevel.HARD: return 'hard';
    case DifficultyLevel.EXTREME: return 'very-hard';
  }
}

export function isGridComplete(gridState: GridState): boolean {
  const puzzleString = convertPuzzleToString(convertGridStateToPuzzle(gridState))
  return !puzzleString.includes('.')
}

export function isGridSolved(gridState: GridState): boolean {
  return isPuzzleSolved(convertGridStateToPuzzle(gridState))
}

export function isPuzzleSolved(puzzle: SudokuPuzzle): boolean {
  const puzzleString = convertPuzzleToString(puzzle)
  if (process.env.NODE_ENV === 'development') {
    try {
      sudoku.print_board(puzzleString)
    } catch (e) {
      console.error(`Error printing current puzzle`, e);
    }
  }

  let standardSolution: string | false
  try {
    standardSolution = sudoku.solve(puzzleString)
  } catch (e) {
    standardSolution = false
    console.error(`Failed to solve the puzzle`, e);
  }
  return puzzleString === standardSolution
}

export function convertGridStateToPuzzle(gridState: GridState): SudokuPuzzle {
  const puzzle = {} as SudokuPuzzle
  Object.keys(gridState)
    .forEach(key => {
      puzzle[key as keyof SudokuPuzzle] = gridState[key as keyof GridState].value
    })

  return puzzle
}

export function convertPuzzleToString(puzzle: SudokuPuzzle): string {
  return Object.keys(puzzle)
    .sort() // Sort keys alphabetically, i.e, cell_row1_column1, cell_row1_column2...
    .map(key => {
      const value = puzzle[key as keyof SudokuPuzzle] // Value is either a number or null
      if (value) {
        return value.toString()
      } else {
        return '.'
      }
    })
    .join("")
}

function generateUniquePuzzleString(difficultyLevel: DifficultyLevel): string {
  let bestEffortUniquePuzzleString = sudoku.generate(getDifficultyLevelString(difficultyLevel))
  let isUnique = false
  let i = 0
  do {
    isUnique = isPuzzleUnique(bestEffortUniquePuzzleString)
    if (!isUnique) {
      bestEffortUniquePuzzleString = sudoku.generate(getDifficultyLevelString(difficultyLevel))
    }
    i++;
  } while (!isUnique && i < MAX_UNIQUENESS_ATTEMPTS);

  return bestEffortUniquePuzzleString
}

function isPuzzleUnique(puzzleString: string): boolean {
  let isUnique = false
  try {
    const standardSolution = sudoku.solve(puzzleString)
    const reverseSolution = sudoku.solve(puzzleString, true)
    isUnique = standardSolution === reverseSolution
  } catch (e) {
    console.error(`Error while solving puzzle`, e);
  }

  return isUnique
}