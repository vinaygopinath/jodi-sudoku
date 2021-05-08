import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { PlayerType } from "../../models/player/PlayerType";
import { MultiplayerGameState } from "../multiplayer-game/MultiplayerGameTypes";
import { PlayerActions } from "./PlayerActions";
import { playerReducer } from "./PlayerReducers";
import { PlayerState } from "./PlayerTypes";

const INITIAL_STATE: PlayerState = {
  onlinePlayer: null,
  multiplayerGameType: null
}

describe('Player reducers', () => {

  it('should return the initial state', () => {
    expect(playerReducer(undefined, null)).toEqual(INITIAL_STATE)
  });

  it('should set the multiplayer game type on SELECT_MULTIPLAYER_GAME_TYPE', () => {
    const someMultiplayerGameType = MultiplayerGameType.COOPERATIVE
    const expectedState: PlayerState = {
      ...INITIAL_STATE,
      multiplayerGameType: someMultiplayerGameType
    }

    const actualState = playerReducer(INITIAL_STATE, PlayerActions.selectMultiplayerGameType(someMultiplayerGameType))

    expect(actualState).toEqual(expectedState)
  });

  it('should reset the player on RESET_PLAYER', () => {
    const customInitialState: PlayerState = {
      ...INITIAL_STATE,
      multiplayerGameType: MultiplayerGameType.COOPERATIVE
    }
    const expectedState = INITIAL_STATE

    const actualState = playerReducer(customInitialState, PlayerActions.resetPlayer())

    expect(actualState).toEqual(expectedState)
  });

});