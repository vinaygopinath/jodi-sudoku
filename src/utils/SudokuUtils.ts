import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { SudokuPuzzle } from "../models/sudoku/SudokuPuzzle";
import sudoku from 'sudoku-umd';
import { RowRange, ColumnRange, CellRowColumnKeyType, CellValueRange, GridState } from "../store/grid/GridTypes";

const MAX_UNIQUENESS_ATTEMPTS = 25

export class SudokuUtils {
  public static generateSudokuPuzzle(difficultyLevel: DifficultyLevel): SudokuPuzzle {
    const sudokuString = SudokuUtils.generateUniquePuzzleString(difficultyLevel)
    // Force Typescript to treat the empty {} as SudokuPuzzle
    // We'll fill in the properties in the loop
    const puzzle: SudokuPuzzle = {} as SudokuPuzzle
    for (let index = 0; index < sudokuString.length; index++) {
      const { row, column } = SudokuUtils.getRowAndColumnFromIndex(index)

      const value = parseInt(sudokuString.charAt(index))
      puzzle[SudokuUtils.getCellKey(row, column)] = value!! ? value as CellValueRange : null
    }

    return puzzle
  }

  public static getCellKey(row: RowRange, column: ColumnRange): CellRowColumnKeyType {
    return `cell_row${row}_column${column}` as CellRowColumnKeyType
  }

  public static getRowAndColumnFromCellKey(key: CellRowColumnKeyType): { row: RowRange, column: ColumnRange } {
    const matches = key.match(/\d/g)
    if (!matches || matches.length !== 2) {
      throw Error(`Invalid key ${key}`)
    }
    return { row: parseInt(matches[0]) as RowRange, column: parseInt(matches[1]) as ColumnRange }
  }

  public static getRowAndColumnFromIndex(index: number): { row: RowRange, column: ColumnRange } {
    const row = ((index === 0) ? 0 : Math.floor(index / 9)) + 1 as RowRange
    const column = (index % 9) + 1 as ColumnRange

    return { row, column }
  }

  private static getDifficultyLevelString(difficultyLevel: DifficultyLevel): string | number {
    switch (difficultyLevel) {
      case DifficultyLevel.EASY: return 'easy';
      case DifficultyLevel.MEDIUM: return 'medium';
      case DifficultyLevel.HARD: return 'hard';
      case DifficultyLevel.EXTREME: return 'very-hard';
    }
  }

  public static isGridComplete(gridState: GridState): boolean {
    const puzzleString = SudokuUtils.convertPuzzleToString(SudokuUtils.convertGridStateToPuzzle(gridState))
    return !puzzleString.includes('.')
  }

  public static isGridSolved(gridState: GridState): boolean {
    return SudokuUtils.isPuzzleSolved(SudokuUtils.convertGridStateToPuzzle(gridState))
  }

  public static isPuzzleSolved(puzzle: SudokuPuzzle): boolean {
    const puzzleString = SudokuUtils.convertPuzzleToString(puzzle)
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

  public static convertGridStateToPuzzle(gridState: GridState): SudokuPuzzle {
    const puzzle = {} as SudokuPuzzle
    Object.keys(gridState)
      .forEach(key => {
        puzzle[key as keyof SudokuPuzzle] = gridState[key as keyof GridState].value
      })

    return puzzle
  }

  public static convertPuzzleToString(puzzle: SudokuPuzzle): string {
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

  private static generateUniquePuzzleString(difficultyLevel: DifficultyLevel): string {
    let bestEffortUniquePuzzleString = sudoku.generate(SudokuUtils.getDifficultyLevelString(difficultyLevel))
    let isUnique = false
    let i = 0
    do {
      isUnique = SudokuUtils.isPuzzleUnique(bestEffortUniquePuzzleString)
      if (!isUnique) {
        bestEffortUniquePuzzleString = sudoku.generate(SudokuUtils.getDifficultyLevelString(difficultyLevel))
      }
      i++;
    } while (!isUnique && i < MAX_UNIQUENESS_ATTEMPTS);

    return bestEffortUniquePuzzleString
  }

  private static isPuzzleUnique(puzzleString: string): boolean {
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
}