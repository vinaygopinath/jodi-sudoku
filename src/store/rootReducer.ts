import { combineReducers } from 'redux';
import { playerReducer } from './player/reducers';
export const rootReducer = combineReducers({
  player: playerReducer
})

export type RootState = ReturnType<typeof rootReducer>