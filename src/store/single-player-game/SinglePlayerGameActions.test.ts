import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { changeValueEntryMode, clearGame, generateSudokuPuzzle, pauseSudokuClock, resumeSudokuClock, selectDifficultyLevel, setActiveDigit, toggleGameComplete, toggleGameSolved, updateSudokuClock } from "./SinglePlayerGameActions";
import { GENERATE_SUDOKU_PUZZLE, PAUSE_SUDOKU_CLOCK, RESUME_SUDOKU_CLOCK, UPDATE_SUDOKU_CLOCK, GenerateSudokuPuzzleAction, UpdateSudokuClockAction, PauseSudokuClockAction, ResumeSudokuClockAction, ChangeValueEntryModeAction, CHANGE_VALUE_ENTRY_MODE, SET_ACTIVE_DIGIT, SetActiveDigitAction, ClearGameAction, CLEAR_GAME, ToggleGameCompleteAction, TOGGLE_GAME_COMPLETED, ToggleGameSolvedAction, TOGGLE_GAME_SOLVED, SELECT_DIFFICULTY_LEVEL, SelectDifficultyLevelAction } from "./SinglePlayerGameTypes";

describe('Single player game actions', () => {
  it('should create a generate sudoku puzzle action', () => {
    const expectedAction: GenerateSudokuPuzzleAction = {
      type: GENERATE_SUDOKU_PUZZLE
    }

    expect(generateSudokuPuzzle()).toEqual(expectedAction)
  });

  it('should create an update sudoku clock action', () => {
    const SOME_TIME = 'time'
    const expectedAction: UpdateSudokuClockAction = {
      type: UPDATE_SUDOKU_CLOCK,
      payload: {
        time: SOME_TIME
      }
    }

    expect(updateSudokuClock(SOME_TIME)).toEqual(expectedAction)
  });

  it('should create a pause sudoku clock action that skips persistence', () => {
    const expectedAction: PauseSudokuClockAction = {
      type: PAUSE_SUDOKU_CLOCK,
      skipPersist: true
    }

    expect(pauseSudokuClock()).toEqual(expectedAction)
  });


  it('should create a resume sudoku clock action that skips persistence', () => {
    const expectedAction: ResumeSudokuClockAction = {
      type: RESUME_SUDOKU_CLOCK,
      skipPersist: true
    }

    expect(resumeSudokuClock()).toEqual(expectedAction)
  });

  it('should create a change value entry mode action', () => {
    const SOME_VALUE_ENTRY_MODE = ValueEntryMode.DIGIT_FIRST
    const expectedAction: ChangeValueEntryModeAction = {
      type: CHANGE_VALUE_ENTRY_MODE,
      payload: {
        newValueEntryMode: SOME_VALUE_ENTRY_MODE
      }
    }

    expect(changeValueEntryMode(SOME_VALUE_ENTRY_MODE)).toEqual(expectedAction)
  });

  it('should create a set active digit action', () => {
    const SOME_ACTIVE_DIGIT = 5
    const expectedAction: SetActiveDigitAction = {
      type: SET_ACTIVE_DIGIT,
      payload: {
        activeDigit: SOME_ACTIVE_DIGIT
      }
    }

    expect(setActiveDigit(SOME_ACTIVE_DIGIT)).toEqual(expectedAction)
  });


  it('should create a clear game action', () => {
    const expectedAction: ClearGameAction = {
      type: CLEAR_GAME,
    }

    expect(clearGame()).toEqual(expectedAction)
  });

  it('should create a game completed action', () => {
    const expectedAction: ToggleGameCompleteAction = {
      type: TOGGLE_GAME_COMPLETED,
      payload: {
        isGameCompleted: true
      }
    }

    expect(toggleGameComplete(true)).toEqual(expectedAction)
  });

  it('should create a game solved action', () => {
    const expectedAction: ToggleGameSolvedAction = {
      type: TOGGLE_GAME_SOLVED,
      payload: {
        isGameSolved: true
      }
    }

    expect(toggleGameSolved(true)).toEqual(expectedAction)
  });

  it('should create a difficulty level selection action', () => {
    const someDifficultyLevel: DifficultyLevel = DifficultyLevel.HARD
    const expectedAction: SelectDifficultyLevelAction = {
      type: SELECT_DIFFICULTY_LEVEL,
      payload: someDifficultyLevel
    }

    expect(selectDifficultyLevel(someDifficultyLevel)).toEqual(expectedAction)
  });
});