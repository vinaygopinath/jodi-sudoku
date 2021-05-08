import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { changeValueEntryMode, clearGame, generateSudokuPuzzle, pauseSudokuClock, resumeSudokuClock, selectDifficultyLevel, setActiveDigit, toggleGameComplete, toggleGameSolved, updateSudokuClock } from "./SinglePlayerGameActions";
import { singlePlayerGameReducer } from "./SinglePlayerGameReducers";
import { SinglePlayerGameState } from "./SinglePlayerGameTypes";

const INITIALISED_STATE: SinglePlayerGameState = {
  gameTime: 'T00:00:00',
  initialised: true,
  difficultyLevel: null,
  isClockRunning: true,
  valueEntryMode: ValueEntryMode.DIGIT_FIRST,
  activeDigit: null,
  isCompleted: false,
  isSolved: false
}

describe('Single player game reducer', () => {

  it('should return the initial state', () => {
    const expectedInitialState: SinglePlayerGameState = {
      initialised: false,
      isClockRunning: false,
      difficultyLevel: null,
      gameTime: 'T00:00:00',
      valueEntryMode: ValueEntryMode.DIGIT_FIRST,
      activeDigit: null,
      isSolved: false,
      isCompleted: false
    }

    expect(singlePlayerGameReducer(undefined, null)).toEqual(expectedInitialState)
  });

  it('should initialise the game on GENERATE_SUDOKU_PUZZLE', () => {

    expect(singlePlayerGameReducer(undefined, generateSudokuPuzzle())).toEqual(INITIALISED_STATE)
  });

  it('should pause the clock on PAUSE_SUDOKU_ACTION', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      isClockRunning: false
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, pauseSudokuClock())

    expect(actualState).toEqual(expectedState)
  });

  it('should resume the clock on RESUME_SUDOKU_ACTION', () => {
    const initialStateWithClockPaused: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      isClockRunning: false
    }
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      isClockRunning: true
    }

    const actualState = singlePlayerGameReducer(initialStateWithClockPaused, resumeSudokuClock())

    expect(actualState).toEqual(expectedState)
  });

  it('should update the clock on UPDATE_SUDOKU_CLOCK', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      gameTime: 'T03:25:06'
    }
    const actualState = singlePlayerGameReducer(INITIALISED_STATE, updateSudokuClock('T3:25:6'))

    expect(actualState).toEqual(expectedState)
  });

  it('should change the value entry mode on CHANGE_VALUE_ENTRY_MODE', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      valueEntryMode: ValueEntryMode.CELL_FIRST
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, changeValueEntryMode(ValueEntryMode.CELL_FIRST))

    expect(actualState).toEqual(expectedState)
  });

  it('should set the active digit on SET_ACTIVE_DIGIT', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      activeDigit: 8
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, setActiveDigit(8))

    expect(actualState).toEqual(expectedState)
  });

  it('should reset the state to initial state on CLEAR_GAME', () => {
    const expectedState: SinglePlayerGameState = {
      initialised: false,
      isClockRunning: false,
      difficultyLevel: null,
      gameTime: 'T00:00:00',
      valueEntryMode: ValueEntryMode.DIGIT_FIRST,
      activeDigit: null,
      isCompleted: false,
      isSolved: false
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, clearGame())

    expect(actualState).toEqual(expectedState)
  });

  it('should update the game completed state on TOGGLE_GAME_COMPLETED', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      isCompleted: true
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, toggleGameComplete(true))

    expect(actualState).toEqual(expectedState)
  });

  it('should update the game solved state on TOGGLE_GAME_SOLVED', () => {
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      isSolved: true
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, toggleGameSolved(true))

    expect(actualState).toEqual(expectedState)
  });

  it('should set the difficulty level on SELECT_DIFFICULTY_LEVEL', () => {
    const someDifficultyLevel = DifficultyLevel.EXTREME
    const expectedState: SinglePlayerGameState = {
      ...INITIALISED_STATE,
      difficultyLevel: someDifficultyLevel
    }

    const actualState = singlePlayerGameReducer(INITIALISED_STATE, selectDifficultyLevel(someDifficultyLevel))

    expect(actualState).toEqual(expectedState)
  });
});