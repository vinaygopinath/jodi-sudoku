import { RootState, rootReducer } from "./RootReducer";
import { createStore, compose, applyMiddleware, Action } from 'redux'
import { StateWithHistory } from 'redux-undo'
import { PersistenceHelper } from "./PersistenceHelper";
import { PLAYER_INITIAL_STATE } from "./player/PlayerReducers";
import { createEpicMiddleware, Epic, combineEpics } from 'redux-observable';
import { rootEpic } from './RootEpic';
import { GRID_INITIAL_STATE } from "./grid/GridReducers";
import { GridState } from "./grid/GridTypes";
import { SINGLE_PLAYER_GAME_INITIAL_STATE } from "./single-player-game/SinglePlayerGameReducers";
import { UPDATE_SUDOKU_CLOCK } from "./single-player-game/SinglePlayerGameTypes";
import { MULTIPLAYER_GAME_INITIAL_STATE } from "./multiplayer-game/MultiplayerGameReducers";

const DEFAULT_STATE: RootState = {
  player: PLAYER_INITIAL_STATE,
  grid: (GRID_INITIAL_STATE as any) as StateWithHistory<GridState>,
  singlePlayerGame: SINGLE_PLAYER_GAME_INITIAL_STATE,
  multiplayerGame: MULTIPLAYER_GAME_INITIAL_STATE
}

const LOG_EXCLUDED_ACTIONS = [
  UPDATE_SUDOKU_CLOCK
]

function configureAppStore(preloadedState: RootState, isRestored: boolean) {
  const middlewares = []

  const epicMiddleware = createEpicMiddleware();
  const epics = combineEpics(
    rootEpic as unknown as Epic<Action<any>, Action<any>, void, any>
  )
  middlewares.push(epicMiddleware)

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger({
      collapsed: true,
      predicate: (state: RootState, action: Action) => !LOG_EXCLUDED_ACTIONS.includes(action.type)
    }));
  }
  const enhancers = compose(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, preloadedState, enhancers)

  epicMiddleware.run(epics)

  return store
}
const restoredState = PersistenceHelper.restoreState()
if (process.env.NODE_ENV === 'development') {
  console.log('Restored state is')
  console.dir(restoredState)
}

export const store = configureAppStore(restoredState || DEFAULT_STATE, !!restoredState)