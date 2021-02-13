import { DifficultyLevel } from "../models/player/DifficultyLevel";
import { generateSudokuPuzzle, getCellKey, getRowAndColumnFromCellKey, getRowAndColumnFromIndex } from "./SudokuUtils";
import 'jest-extended'

describe('SudokuUtils', () => {

  // Difficulty level --> number of cells map
  // https://github.com/apieceofbart/sudoku.js/blob/15b222b460c20bda32d773215e5e3c6b471eb314/sudoku.js#L40-L47
  // "easy":         62,
  // "medium":       53,
  // "hard":         44,
  // "very-hard":    35,
  // "insane":       26,
  // "inhuman":      17,
  describe('generateSudokuPuzzle', () => {
    it('should generate an easy puzzle', () => {
      const puzzle = generateSudokuPuzzle(DifficultyLevel.EASY)

      const numPuzzleValues = Object.values(puzzle).filter(cellValue => !!cellValue).length

      expect(numPuzzleValues).toBeWithin(60, 70)
    });

    it('should generate a medium puzzle', () => {
      const puzzle = generateSudokuPuzzle(DifficultyLevel.MEDIUM)

      const numPuzzleValues = Object.values(puzzle).filter(cellValue => !!cellValue).length

      expect(numPuzzleValues).toBeWithin(50, 60)
    });

    it('should generate a hard puzzle', () => {
      const puzzle = generateSudokuPuzzle(DifficultyLevel.HARD)

      const numPuzzleValues = Object.values(puzzle).filter(cellValue => !!cellValue).length

      expect(numPuzzleValues).toBeWithin(40, 50)
    });

    it('should generate an extreme puzzle', () => {
      const puzzle = generateSudokuPuzzle(DifficultyLevel.EXTREME)

      const numPuzzleValues = Object.values(puzzle).filter(cellValue => !!cellValue).length

      expect(numPuzzleValues).toBeWithin(30, 40)
    });
  });

  describe('Cell key/index to row+column conversion', () => {
    it('should returns a cell key for the given row and column', () => {
      const cellKey = getCellKey(3, 5)
      expect(cellKey).toEqual("cell_row3_column5")
    });

    it('should return the row and column for a given cell key', () => {
      const { row, column } = getRowAndColumnFromCellKey("cell_row4_column7")

      expect(row).toBe(4)
      expect(column).toBe(7)
    });

    it('should conver the first index to a row and column', () => {
      // The first element in a zero-indexed array is at position 0
      const { row, column } = getRowAndColumnFromIndex(0)

      expect(row).toBe(1)
      expect(column).toBe(1)
    });

    it('should convert an first row index to a row and column', () => {
      // 9 X 9 has 81 elements. Index 7 is the 8th column in the first row
      const { row, column } = getRowAndColumnFromIndex(7)

      expect(row).toBe(1)
      expect(column).toBe(8)
    });

    it('should convert an seventh column index to a row and column', () => {
      // 9 X 9 has 81 elements. Index 6 is the 7th column in the first row + (9 * 4) for four more rows
      const { row, column } = getRowAndColumnFromIndex(42)

      expect(row).toBe(5)
      expect(column).toBe(7)
    });

    it('should convert the last index to a row and column', () => {
      // 9 X 9 has 81 elements. The last element in a zero-indexed array is 80
      const { row, column } = getRowAndColumnFromIndex(80)

      expect(row).toBe(9)
      expect(column).toBe(9)
    });
  });
});