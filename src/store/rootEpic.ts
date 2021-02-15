import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable'
import { Action } from '../models/common/Action'
import { RootState } from './rootReducer'
import { filter, mergeMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { PersistenceHelper } from './PersistenceHelper'
import { gameEpics } from './game/game-epics'
import { UPDATE_SUDOKU_CLOCK, UpdateSudokuClockAction } from './game/game-types'
import { gridEpics } from './grid/grid-epics'

export const rootEpic = combineEpics(
  gameEpics,
  gridEpics,
  persistState
)

function persistState(action$: ActionsObservable<Action>, state$: StateObservable<RootState>) {
  return action$.pipe(
    filter(action => !action.skipPersist),
    mergeMap(action => {
      if (action.type === UPDATE_SUDOKU_CLOCK) {
        const updateAction = action as UpdateSudokuClockAction
        const timeString = updateAction.payload.time
        if (!timeString.endsWith("5") && !timeString.endsWith("0")) {
          return EMPTY
        }
      }
      PersistenceHelper.persistState(state$.value)
      return EMPTY
    })
  )
}