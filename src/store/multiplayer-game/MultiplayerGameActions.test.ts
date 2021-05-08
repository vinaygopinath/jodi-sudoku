import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { clearDifficultyLevel, clearGameType, createRoom, selectDifficultyLevel, selectGameType } from "./MultiplayerGameActions";
import { SELECT_GAME_TYPE, SELECT_DIFFICULTY_LEVEL, SelectGameTypeAction, SelectDifficultyLevelAction, ClearGameTypeAction, CLEAR_GAME_TYPE, ClearDifficultyLevelAction, CLEAR_DIFFICULTY_LEVEL, CreateRoomAction, CREATE_ROOM } from "./MultiplayerGameTypes";

describe('Multiplayer game actions', () => {
  it('should create a difficulty level selection action', () => {
    const someDifficultyLevel = DifficultyLevel.HARD
    const expectedAction: SelectDifficultyLevelAction = {
      type: SELECT_DIFFICULTY_LEVEL,
      payload: someDifficultyLevel
    }

    expect(selectDifficultyLevel(someDifficultyLevel)).toEqual(expectedAction)
  });

  it('should create a clear difficulty level selection action', () => {
    const expectedAction: ClearDifficultyLevelAction = {
      type: CLEAR_DIFFICULTY_LEVEL
    }

    expect(clearDifficultyLevel()).toEqual(expectedAction)
  });

  it('should create a game type selection action', () => {
    const someGameType = MultiplayerGameType.COOPERATIVE
    const expectedAction: SelectGameTypeAction = {
      type: SELECT_GAME_TYPE,
      payload: someGameType
    }

    expect(selectGameType(someGameType)).toEqual(expectedAction)
  });

  it('should create a clear game type selection action', () => {
    const expectedAction: ClearGameTypeAction = {
      type: CLEAR_GAME_TYPE
    }

    expect(clearGameType()).toEqual(expectedAction)
  });

  it('should create a create room action', () => {
    const someName = "Some room name"
    const someLink = "some-room-name"
    const someDescription = "some description"
    const expectedAction: CreateRoomAction = {
      type: CREATE_ROOM,
      payload: {
        name: someName,
        link: someLink,
        description: someDescription
      }
    }

    expect(createRoom(someName, someLink, someDescription)).toEqual(expectedAction)
  })
});