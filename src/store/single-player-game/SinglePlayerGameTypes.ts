import { Action } from "../../models/common/Action";
import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { CellValueRange } from "../grid/GridTypes";

export const GENERATE_SUDOKU_PUZZLE = 'GENERATE_SUDOKU_PUZZLE'
export const UPDATE_SUDOKU_CLOCK = 'UPDATE_SUDOKU_CLOCK'
export const RESUME_SUDOKU_CLOCK = 'RESUME_SUDOKU_CLOCK'
export const PAUSE_SUDOKU_CLOCK = 'PAUSE_SUDOKU_CLOCK'
export const CHANGE_VALUE_ENTRY_MODE = 'CHANGE_VALUE_ENTRY_MODE'
export const SET_ACTIVE_DIGIT = 'SET_ACTIVE_DIGIT'
export const CLEAR_GAME = 'CLEAR_GAME'
export const TOGGLE_GAME_COMPLETED = 'TOGGLE_GAME_COMPLETED'
export const TOGGLE_GAME_SOLVED = 'TOGGLE_GAME_SOLVED'
export const SELECT_DIFFICULTY_LEVEL = 'SELECT_SINGLE_PLAYER_DIFFICULTY_LEVEL';

export type SinglePlayerGameActionTypes = GenerateSudokuPuzzleAction | UpdateSudokuClockAction | PauseSudokuClockAction | ResumeSudokuClockAction | ChangeValueEntryModeAction | SetActiveDigitAction | ClearGameAction | ToggleGameCompleteAction | ToggleGameSolvedAction | SelectDifficultyLevelAction

export interface SelectDifficultyLevelAction extends Action {
  type: typeof SELECT_DIFFICULTY_LEVEL,
  payload: DifficultyLevel
}

export interface GenerateSudokuPuzzleAction extends Action {
  type: typeof GENERATE_SUDOKU_PUZZLE
}

export interface UpdateSudokuClockAction extends Action {
  type: typeof UPDATE_SUDOKU_CLOCK,
  payload: {
    time: string
  }
}

export interface PauseSudokuClockAction extends Action {
  type: typeof PAUSE_SUDOKU_CLOCK
}

export interface ResumeSudokuClockAction extends Action {
  type: typeof RESUME_SUDOKU_CLOCK
}

export interface ChangeValueEntryModeAction extends Action {
  type: typeof CHANGE_VALUE_ENTRY_MODE,
  payload: {
    newValueEntryMode: ValueEntryMode
  }
}

export interface SetActiveDigitAction extends Action {
  type: typeof SET_ACTIVE_DIGIT,
  payload: {
    activeDigit: CellValueRange
  }
}

export interface ClearGameAction extends Action {
  type: typeof CLEAR_GAME
}

export interface ToggleGameCompleteAction extends Action {
  type: typeof TOGGLE_GAME_COMPLETED,
  payload: {
    isGameCompleted: boolean
  }
}

export interface ToggleGameSolvedAction extends Action {
  type: typeof TOGGLE_GAME_SOLVED,
  payload: {
    isGameSolved: boolean
  }
}

export interface SinglePlayerGameState {
  initialised: boolean,
  gameTime: string,
  difficultyLevel: DifficultyLevel | null,
  isClockRunning: boolean,
  valueEntryMode: ValueEntryMode,
  activeDigit: CellValueRange | null,
  isCompleted: boolean,
  isSolved: boolean
}