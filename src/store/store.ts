import { RootState, rootReducer } from "./rootReducer";
import { createStore, compose, applyMiddleware, Action } from 'redux'
import { StateWithHistory } from 'redux-undo'
import { PersistenceHelper } from "./PersistenceHelper";
import { PLAYER_INITIAL_STATE } from "./player/player-reducers";
import { createEpicMiddleware, Epic, combineEpics } from 'redux-observable';
import { rootEpic } from './rootEpic';
import { GRID_INITIAL_STATE as GRID_INITIAL_STATE } from "./grid/grid-reducers";
import { GridState } from "./grid/grid-types";

const DEFAULT_STATE: RootState = {
  player: PLAYER_INITIAL_STATE,
  grid: (GRID_INITIAL_STATE as any) as StateWithHistory<GridState>
}

function configureAppStore(preloadedState: RootState, isRestored: boolean) {
  const middlewares = []

  const epicMiddleware = createEpicMiddleware();
  const epics = combineEpics(
    rootEpic as unknown as Epic<Action<any>, Action<any>, void, any>
  )
  middlewares.push(epicMiddleware)

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger({ collapsed: true }));
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