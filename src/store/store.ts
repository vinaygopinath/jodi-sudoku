import { RootState, rootReducer } from "./rootReducer";
import { createStore, compose, applyMiddleware } from 'redux'
import { PersistenceHelper } from "./PersistenceHelper";
import { PLAYER_INITIAL_STATE } from "./player/reducers";

const DEFAULT_STATE: RootState = {
  player: PLAYER_INITIAL_STATE
}

function configureAppStore(preloadedState: RootState) {
  const middlewares = []

  // TODO Set up middleware for epics
  // const epicMiddleware = createEpicMiddleware();
  // middlewares.push(epicMiddleware)

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger({ collapsed: true }));
  }
  const enhancers = compose(applyMiddleware(...middlewares))

  // epicMiddleware.run(rootEpic)

  return createStore(rootReducer, preloadedState, enhancers)
}
const restoredState = PersistenceHelper.restoreState()
console.log('Restored state is')
console.dir(restoredState)
console.log('Default state is')
console.dir(DEFAULT_STATE)

export const store = configureAppStore(DEFAULT_STATE)