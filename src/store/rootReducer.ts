import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';
import { playerReducer } from './player/player-reducers';
import { gridReducer } from './grid/grid-reducers';
import { MOVE_CELL_FOCUS_BY_ARROW_KEY, CHANGE_CELL_FOCUS, INITIALISE_CELL } from './grid/grid-types';
import { gameReducer } from './game/game-reducers';
export const rootReducer = combineReducers({
  player: playerReducer,
  grid: undoable(gridReducer, { filter: excludeAction([MOVE_CELL_FOCUS_BY_ARROW_KEY, CHANGE_CELL_FOCUS, INITIALISE_CELL]) }),
  game: gameReducer
})

export type RootState = ReturnType<typeof rootReducer>