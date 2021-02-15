import { ValueEntryMode } from "../../models/game/ValueEntryMode";
import { changeValueEntryMode, clearGame, generateSudokuPuzzle, pauseSudokuClock, resumeSudokuClock, setActiveDigit, toggleGameComplete, toggleGameSolved, updateSudokuClock } from "./game-actions";
import { gameReducer, GAME_INITIAL_STATE } from "./game-reducers";
import { GameState, GenerateSudokuPuzzleAction } from "./game-types";

const INITIALISED_STATE: GameState = {
  gameTime: 'T00:00:00',
  initialised: true,
  isClockRunning: true,
  valueEntryMode: ValueEntryMode.DIGIT_FIRST,
  activeDigit: null,
  isCompleted: false,
  isSolved: false
}

describe('Game reducer', () => {

  it('should return the initial state', () => {
    const expectedInitialState: GameState = {
      initialised: false,
      isClockRunning: false,
      gameTime: 'T00:00:00',
      valueEntryMode: ValueEntryMode.DIGIT_FIRST,
      activeDigit: null,
      isSolved: false,
      isCompleted: false
    }

    expect(gameReducer(undefined, null)).toEqual(expectedInitialState)
  });

  it('should initialise the game on GENERATE_SUDOKU_PUZZLE', () => {

    expect(gameReducer(undefined, generateSudokuPuzzle())).toEqual(INITIALISED_STATE)
  });

  it('should pause the clock on PAUSE_SUDOKU_ACTION', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      isClockRunning: false
    }

    const actualState = gameReducer(INITIALISED_STATE, pauseSudokuClock())

    expect(actualState).toEqual(expectedState)
  });

  it('should resume the clock on RESUME_SUDOKU_ACTION', () => {
    const initialStateWithClockPaused: GameState = {
      ...INITIALISED_STATE,
      isClockRunning: false
    }
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      isClockRunning: true
    }

    const actualState = gameReducer(initialStateWithClockPaused, resumeSudokuClock())

    expect(actualState).toEqual(expectedState)
  });

  it('should update the clock on UPDATE_SUDOKU_CLOCK', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      gameTime: 'T03:25:06'
    }
    const actualState = gameReducer(INITIALISED_STATE, updateSudokuClock('T3:25:6'))

    expect(actualState).toEqual(expectedState)
  });

  it('should change the value entry mode on CHANGE_VALUE_ENTRY_MODE', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      valueEntryMode: ValueEntryMode.CELL_FIRST
    }

    const actualState = gameReducer(INITIALISED_STATE, changeValueEntryMode(ValueEntryMode.CELL_FIRST))

    expect(actualState).toEqual(expectedState)
  });

  it('should set the active digit on SET_ACTIVE_DIGIT', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      activeDigit: 8
    }

    const actualState = gameReducer(INITIALISED_STATE, setActiveDigit(8))

    expect(actualState).toEqual(expectedState)
  });

  it('should reset the state to initial state on CLEAR_GAME', () => {
    const expectedState: GameState = {
      initialised: false,
      isClockRunning: false,
      gameTime: 'T00:00:00',
      valueEntryMode: ValueEntryMode.DIGIT_FIRST,
      activeDigit: null,
      isCompleted: false,
      isSolved: false
    }

    const actualState = gameReducer(INITIALISED_STATE, clearGame())

    expect(actualState).toEqual(expectedState)
  });

  it('should update the game completed state on TOGGLE_GAME_COMPLETED', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      isCompleted: true
    }

    const actualState = gameReducer(INITIALISED_STATE, toggleGameComplete(true))

    expect(actualState).toEqual(expectedState)
  });

  it('should update the game solved state on TOGGLE_GAME_SOLVED', () => {
    const expectedState: GameState = {
      ...INITIALISED_STATE,
      isSolved: true
    }

    const actualState = gameReducer(INITIALISED_STATE, toggleGameSolved(true))

    expect(actualState).toEqual(expectedState)
  });
});