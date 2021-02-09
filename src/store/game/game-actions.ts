import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { CellValueRange } from "../grid/grid-types";
import { GameActionTypes, GENERATE_SUDOKU_PUZZLE, UPDATE_SUDOKU_CLOCK, PAUSE_SUDOKU_CLOCK, RESUME_SUDOKU_CLOCK, CHANGE_VALUE_ENTRY_MODE, SET_ACTIVE_DIGIT, CLEAR_GAME } from "./game-types";

export function generateSudokuPuzzle(): GameActionTypes {
  return {
    type: GENERATE_SUDOKU_PUZZLE
  }
}

export function updateSudokuClock(time: string): GameActionTypes {
  return {
    type: UPDATE_SUDOKU_CLOCK,
    payload: {
      time: time
    }
  }
}

export function pauseSudokuClock(): GameActionTypes {
  return {
    type: PAUSE_SUDOKU_CLOCK,
    skipPersist: true
  }
}

export function resumeSudokuClock(): GameActionTypes {
  return {
    type: RESUME_SUDOKU_CLOCK,
    skipPersist: true
  }
}

export function changeValueEntryMode(valueEntryMode: ValueEntryMode): GameActionTypes {
  return {
    type: CHANGE_VALUE_ENTRY_MODE,
    payload: {
      newValueEntryMode: valueEntryMode
    }
  }
}

export function setActiveDigit(activeDigit: CellValueRange): GameActionTypes {
  return {
    type: SET_ACTIVE_DIGIT,
    payload: {
      activeDigit: activeDigit
    }
  }
}

export function clearGame(): GameActionTypes {
  return {
    type: CLEAR_GAME
  }
}