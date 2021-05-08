import { ValueEntryMode } from "../../models/game/ValueEntryMode"
import { DifficultyLevel } from "../../models/player/DifficultyLevel"
import { CellValueRange } from "../grid/GridTypes"
import {
  SinglePlayerGameActionTypes,
  GENERATE_SUDOKU_PUZZLE,
  UPDATE_SUDOKU_CLOCK,
  PAUSE_SUDOKU_CLOCK,
  RESUME_SUDOKU_CLOCK,
  CHANGE_VALUE_ENTRY_MODE,
  SET_ACTIVE_DIGIT,
  CLEAR_GAME,
  TOGGLE_GAME_COMPLETED,
  TOGGLE_GAME_SOLVED,
  SELECT_DIFFICULTY_LEVEL,
} from "./SinglePlayerGameTypes"

export function generateSudokuPuzzle(): SinglePlayerGameActionTypes {
  return {
    type: GENERATE_SUDOKU_PUZZLE,
  }
}

export function updateSudokuClock(time: string): SinglePlayerGameActionTypes {
  return {
    type: UPDATE_SUDOKU_CLOCK,
    payload: {
      time: time,
    },
  }
}

export function pauseSudokuClock(): SinglePlayerGameActionTypes {
  return {
    type: PAUSE_SUDOKU_CLOCK,
    skipPersist: true,
  }
}

export function resumeSudokuClock(): SinglePlayerGameActionTypes {
  return {
    type: RESUME_SUDOKU_CLOCK,
    skipPersist: true,
  }
}

export function changeValueEntryMode(
  valueEntryMode: ValueEntryMode
): SinglePlayerGameActionTypes {
  return {
    type: CHANGE_VALUE_ENTRY_MODE,
    payload: {
      newValueEntryMode: valueEntryMode,
    },
  }
}

export function setActiveDigit(
  activeDigit: CellValueRange
): SinglePlayerGameActionTypes {
  return {
    type: SET_ACTIVE_DIGIT,
    payload: {
      activeDigit: activeDigit,
    },
  }
}

export function clearGame(): SinglePlayerGameActionTypes {
  return {
    type: CLEAR_GAME,
  }
}

export function toggleGameComplete(
  isGameCompleted: boolean
): SinglePlayerGameActionTypes {
  return {
    type: TOGGLE_GAME_COMPLETED,
    payload: {
      isGameCompleted: isGameCompleted,
    },
  }
}

export function toggleGameSolved(
  isGameSolved: boolean
): SinglePlayerGameActionTypes {
  return {
    type: TOGGLE_GAME_SOLVED,
    payload: {
      isGameSolved: isGameSolved,
    },
  }
}

export function selectDifficultyLevel(
  difficultyLevel: DifficultyLevel
): SinglePlayerGameActionTypes {
  return {
    type: SELECT_DIFFICULTY_LEVEL,
    payload: difficultyLevel,
  }
}
