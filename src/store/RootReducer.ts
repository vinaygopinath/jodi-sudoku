import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';
import { playerReducer } from './player/PlayerReducers';
import { gridReducer } from './grid/GridReducers';
import { MOVE_CELL_FOCUS_BY_ARROW_KEY, CHANGE_CELL_FOCUS, INITIALISE_CELL } from './grid/GridTypes';
import { singlePlayerGameReducer } from './single-player-game/SinglePlayerGameReducers';
import { multiplayerGameReducer } from './multiplayer-game/MultiplayerGameReducers'
export const rootReducer = combineReducers({
  player: playerReducer,
  grid: undoable(gridReducer, { filter: excludeAction([MOVE_CELL_FOCUS_BY_ARROW_KEY, CHANGE_CELL_FOCUS, INITIALISE_CELL]) }),
  singlePlayerGame: singlePlayerGameReducer,
  multiplayerGame: multiplayerGameReducer
})

export type RootState = ReturnType<typeof rootReducer>