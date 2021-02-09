import { Action } from "../../models/common/Action";
import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { CellValueRange } from "../grid/grid-types";

export const GENERATE_SUDOKU_PUZZLE = 'GENERATE_SUDOKU_PUZZLE'
export const UPDATE_SUDOKU_CLOCK = 'UPDATE_SUDOKU_CLOCK'
export const RESUME_SUDOKU_CLOCK = 'RESUME_SUDOKU_CLOCK'
export const PAUSE_SUDOKU_CLOCK = 'PAUSE_SUDOKU_CLOCK'
export const CHANGE_VALUE_ENTRY_MODE = 'CHANGE_VALUE_ENTRY_MODE'
export const SET_ACTIVE_DIGIT = 'SET_ACTIVE_DIGIT'
export const CLEAR_GAME = 'CLEAR_GAME'

export type GameActionTypes = GenerateSudokuPuzzleAction | UpdateSudokuClockAction | PauseSudokuClockAction | ResumeSudokuClockAction | ChangeNumberModeAction | SetActiveDigitAction | ClearGameAction

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

interface ChangeNumberModeAction extends Action {
  type: typeof CHANGE_VALUE_ENTRY_MODE,
  payload: {
    newValueEntryMode: ValueEntryMode
  }
}

interface SetActiveDigitAction extends Action {
  type: typeof SET_ACTIVE_DIGIT,
  payload: {
    activeDigit: CellValueRange
  }
}

interface ClearGameAction extends Action {
  type: typeof CLEAR_GAME
}

export interface GameState {
  initialised: boolean,
  gameTime: string,
  isClockRunning: boolean,
  valueEntryMode: ValueEntryMode,
  activeDigit: CellValueRange | null
}