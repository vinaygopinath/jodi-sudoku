import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable'
import { Action } from '../models/common/Action'
import { RootState } from './rootReducer'
import { filter, mergeMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { PersistenceHelper } from './PersistenceHelper'
import { gameEpics } from './game/game-epics'

export const rootEpic = combineEpics(
  gameEpics,
  persistState
)

function persistState(action$: ActionsObservable<Action>, state$: StateObservable<RootState>) {
  return action$.pipe(
    filter(action => !action.skipPersist),
    mergeMap(action => {
      PersistenceHelper.persistState(state$.value)
      return EMPTY
    })
  )
}