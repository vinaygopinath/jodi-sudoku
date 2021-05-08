import { PlayerActionTypes, RESET_PLAYER, SELECT_MULTIPLAYER_GAME_TYPE } from "./PlayerTypes";
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType";

export class PlayerActions {

  public static selectMultiplayerGameType(multiplayerGameType: MultiplayerGameType): PlayerActionTypes {
    return {
      type: SELECT_MULTIPLAYER_GAME_TYPE,
      payload: multiplayerGameType
    }
  }

  public static resetPlayer(): PlayerActionTypes {
    return {
      type: RESET_PLAYER
    }
  }
}