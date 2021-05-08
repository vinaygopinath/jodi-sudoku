import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { clearDifficultyLevel, clearGameType, selectDifficultyLevel, selectGameType } from "./MultiplayerGameActions";
import { multiplayerGameReducer } from "./MultiplayerGameReducers";
import { MultiplayerGameState } from "./MultiplayerGameTypes";

export const INITIAL_STATE: MultiplayerGameState = {
  room: null,
  difficultyLevel: null,
  gameType: null,
  otherPlayers: null
}

describe('Multiplayer game reducer', () => {

  it('should return the initial state', () => {
    expect(multiplayerGameReducer(undefined, null))
    .toEqual(INITIAL_STATE)
  });

  it('should set the difficulty level on SELECT_DIFFICULTY_LEVEL', () => {
    const someDifficultyLevel = DifficultyLevel.EXTREME
    const expectedState: MultiplayerGameState = {
      ...INITIAL_STATE,
      difficultyLevel: someDifficultyLevel
    }

    const actualState = multiplayerGameReducer(INITIAL_STATE, selectDifficultyLevel(someDifficultyLevel))
    expect(actualState).toEqual(expectedState)
  });

  it('should clear the difficulty level on CLEAR_DIFFICULTY_LEVEL', () => {
    const initialState: MultiplayerGameState = {
      ...INITIAL_STATE,
      difficultyLevel: DifficultyLevel.EASY
    }
    const expectedState: MultiplayerGameState = {
      ...initialState,
      difficultyLevel: null
    }

    const actualState = multiplayerGameReducer(initialState, clearDifficultyLevel())

    expect(actualState).toEqual(expectedState)
  });

  it('should set the game type on SELECT_GAME_TYPE', () => {
    const someGameType = MultiplayerGameType.COOPERATIVE
    const expectedState: MultiplayerGameState = {
      ...INITIAL_STATE,
      gameType: someGameType
    }

    const actualState = multiplayerGameReducer(INITIAL_STATE, selectGameType(someGameType))

    expect(actualState).toEqual(expectedState)
  });

  it('should clear the game type on CLEAR_GAME_TYPE', () => {
    const initialState: MultiplayerGameState = {
      ...INITIAL_STATE,
      gameType: MultiplayerGameType.COOPERATIVE
    }
    const expectedState: MultiplayerGameState = {
      ...initialState,
      gameType: null
    }

    const actualState = multiplayerGameReducer(initialState, clearGameType())

    expect(actualState).toEqual(expectedState)
  });

});