import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";
import { RESET_PLAYER, SELECT_MULTIPLAYER_GAME_TYPE } from './PlayerTypes'
import { PlayerActions } from './PlayerActions'
describe('PlayerActions', () => {

  it('should create a multiplayer mode selection action', () => {
    const someMultiplayerGameType = MultiplayerGameType.COOPERATIVE
    const expectedAction = {
      type: SELECT_MULTIPLAYER_GAME_TYPE,
      payload: someMultiplayerGameType
    }

    const actualAction = PlayerActions.selectMultiplayerGameType(someMultiplayerGameType)

    expect(actualAction).toEqual(expectedAction)
  });

  it('should create a reset player action', () => {
    const expectedAction = {
      type: RESET_PLAYER
    }
    const actualAction = PlayerActions.resetPlayer()

    expect(actualAction).toEqual(expectedAction)
  });

});