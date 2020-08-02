import { RootState, rootReducer } from "./rootReducer";
import { createStore, compose, applyMiddleware, Action } from 'redux'
import { PersistenceHelper } from "./PersistenceHelper";
import { PLAYER_INITIAL_STATE } from "./player/reducers";
import { createEpicMiddleware, Epic, combineEpics } from 'redux-observable';
import { rootEpic } from './rootEpic';

const DEFAULT_STATE: RootState = {
  player: PLAYER_INITIAL_STATE
}

function configureAppStore(preloadedState: RootState) {
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
  console.log('Default state is')
  console.dir(DEFAULT_STATE)
}

export const store = configureAppStore(restoredState || DEFAULT_STATE)