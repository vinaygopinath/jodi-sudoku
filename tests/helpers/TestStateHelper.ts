import { DifficultyLevel } from "../../src/models/player/DifficultyLevel";
import { ValueEntryMode } from "../../src/models/game/ValueEntryMode";
import { CellValueRange } from "../../src/store/grid/GridTypes";
import { GridState } from '../../src/store/grid/GridTypes'
import { RootState } from '../../src/store/RootReducer'
import { GRID_INITIAL_STATE } from '../../src/store/grid/GridReducers'
import { PlayerState } from '../../src/store/player/PlayerTypes'
import { PLAYER_INITIAL_STATE } from '../../src/store/player/PlayerReducers'
import { SinglePlayerGameState } from '../../src/store/single-player-game/SinglePlayerGameTypes'
import { SINGLE_PLAYER_GAME_INITIAL_STATE } from '../../src/store/single-player-game/SinglePlayerGameReducers'
import { MultiplayerGameState } from '../../src/store/multiplayer-game/MultiplayerGameTypes'
import { MULTIPLAYER_GAME_INITIAL_STATE } from '../../src/store/multiplayer-game/MultiplayerGameReducers'

interface RootStateParameters {
  player?: PlayerState,
  singlePlayerGame?: SinglePlayerGameState,
  multiplayerGame?: MultiplayerGameState,
  presentGridState?: GridState,
  pastGridStates?: GridState[],
  futureGridStates?: GridState[]
}

interface SinglePlayerGameStateParameters {
  initialised?: boolean,
  gameTime?: string,
  difficultyLevel?: DifficultyLevel | null,
  isClockRunning?: boolean,
  valueEntryMode?: ValueEntryMode,
  activeDigit?: CellValueRange | null,
  isCompleted?: boolean,
  isSolved?: boolean
}

export class TestStateHelper {

  public static createRootState({
    player = PLAYER_INITIAL_STATE,
    singlePlayerGame = SINGLE_PLAYER_GAME_INITIAL_STATE,
    multiplayerGame = MULTIPLAYER_GAME_INITIAL_STATE,
    presentGridState = GRID_INITIAL_STATE,
    pastGridStates = [],
    futureGridStates = []
  }: RootStateParameters = {}): RootState {
    return {
      player: player,
      singlePlayerGame: singlePlayerGame,
      multiplayerGame: multiplayerGame,
      grid: {
        past: pastGridStates,
        present: presentGridState,
        future: futureGridStates
      }
    }
  }

  public static createSinglePlayerGameState({
    initialised = SINGLE_PLAYER_GAME_INITIAL_STATE.initialised,
    gameTime = SINGLE_PLAYER_GAME_INITIAL_STATE.gameTime,
    difficultyLevel = SINGLE_PLAYER_GAME_INITIAL_STATE.difficultyLevel,
    isClockRunning = SINGLE_PLAYER_GAME_INITIAL_STATE.isClockRunning,
    valueEntryMode = SINGLE_PLAYER_GAME_INITIAL_STATE.valueEntryMode,
    activeDigit = SINGLE_PLAYER_GAME_INITIAL_STATE.activeDigit,
    isCompleted = SINGLE_PLAYER_GAME_INITIAL_STATE.isCompleted,
    isSolved = SINGLE_PLAYER_GAME_INITIAL_STATE.isSolved
  }: SinglePlayerGameStateParameters = {}): SinglePlayerGameState {
    return {
      initialised: initialised,
      gameTime: gameTime,
      difficultyLevel: difficultyLevel,
      isClockRunning: isClockRunning,
      valueEntryMode: valueEntryMode,
      activeDigit: activeDigit,
      isCompleted: isCompleted,
      isSolved: isSolved
    }
  }
}