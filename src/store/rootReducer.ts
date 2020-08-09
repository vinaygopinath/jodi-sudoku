import { combineReducers } from 'redux';
import { playerReducer } from './player/player-reducers';
import { gameReducer } from './game/game-reducers';
export const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer
})

export type RootState = ReturnType<typeof rootReducer>