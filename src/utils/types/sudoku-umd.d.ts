declare module 'sudoku-umd' {
  /** Generate a new Sudoku puzzle of a particular `difficulty`, e.g.,
   * // Generate an "easy" sudoku puzzle
   * sudoku.generate("easy");
   *
   *
   * Difficulties are as follows, and represent the number of given squares:
   *
   *             "easy":         61
   *             "medium":       52
   *             "hard":         43
   *             "very-hard":    34
   *             "insane":       25
   *             "inhuman":      17
   *
   *
   *     You may also enter a custom number of squares to be given, e.g.,
   *
   *         // Generate a new Sudoku puzzle with 60 given squares
   *         sudoku.generate(60)
   *
   *
   *     `difficulty` must be a number between 17 and 81 inclusive. If it's
   *     outside of that range, `difficulty` will be set to the closest bound,
   *     e.g., 0 -> 17, and 100 -> 81.
   *
   *
   *     By default, the puzzles are unique, unless you set `unique` to false.
   *     (Note: Puzzle uniqueness is not yet implemented, so puzzles are *not*
   *     guaranteed to have unique solutions)
   */
  declare function generate(difficulty: string | number, unique?: boolean): string

  /**
   * Solve a sudoku puzzle given a sudoku `board`, i.e., an 81-character
   * string of sudoku.DIGITS, 1-9, and spaces identified by '.', representing the
   * squares. There must be a minimum of 17 givens. If the given board has no
   * solutions, return false.
   *
   * Optionally set `reverse` to solve "backwards", i.e., rotate through the
   * possibilities in reverse. Useful for checking if there is more than one
   * solution.
   */
  declare function solve(board: string, reverse?: boolean): string | false

  /**
   * Print a sudoku `board` to the console
   *
   * @param board A string of 81 characters representing the board,
   * with digits [1-9] or a dot to represent an empty cell
   */
  declare function print_board(board: string): string
}