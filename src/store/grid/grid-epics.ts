import { ActionsObservable, combineEpics, StateObservable, ofType } from "redux-observable";
import { Action } from '../../models/common/Action'
import { CLEAR_CELL_VALUE, RESET_CELL, SET_SELECTED_CELL_VALUE, SET_VALUE_OF_ACTIVE_CELL } from "./grid-types";
import { RootState } from '../rootReducer'
import { filter, mergeMap } from 'rxjs/operators'
import { isGridComplete, isGridSolved } from "../../utils/SudokuUtils";
import { EMPTY, from } from "rxjs";
import { pauseSudokuClock, resumeSudokuClock, toggleGameComplete, toggleGameSolved } from "../game/game-actions";
import { ActionTypes as UndoActions, ActionCreators as UndoActionCreators } from 'redux-undo';
import { AnalyticsUtils } from "../../utils/AnalyticsUtils";

export const gridEpics = combineEpics(
  markGameAsCompletedAndSolved,
  markGameAsNotCompleteAndNotSolved
)

export function markGameAsCompletedAndSolved(
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) {
  return action$.pipe(
    ofType(SET_VALUE_OF_ACTIVE_CELL, SET_SELECTED_CELL_VALUE, UndoActions.UNDO, UndoActions.REDO),
    mergeMap(() => {
      const isComplete = isGridComplete(state$.value.grid.present)
      if (!isComplete) {
        return EMPTY
      }

      const actions: Action[] = []
      if (isComplete && !state$.value.game.isCompleted) {
        actions.push(toggleGameComplete(true))
      }
      if (isGridSolved(state$.value.grid.present)) {
        const { playerType, difficultyLevel } = state$.value.player
        if (playerType != null && difficultyLevel != null) {
          AnalyticsUtils.logSolveGame(playerType, difficultyLevel)
        }
        actions.push(toggleGameSolved(true), UndoActionCreators.clearHistory(), pauseSudokuClock())
      }

      return from(actions)
    })
  )
}

export function markGameAsNotCompleteAndNotSolved(
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) {
  return action$.pipe(
    ofType(CLEAR_CELL_VALUE, RESET_CELL, UndoActions.UNDO, UndoActions.REDO),
    filter(() => state$.value.game.isCompleted && !isGridComplete(state$.value.grid.present)),
    mergeMap(() => {
      const actions: Action[] = [toggleGameComplete(false)]
      if (state$.value.game.isSolved) {
        actions.push(toggleGameSolved(false), resumeSudokuClock())
      }

      return from(actions)
    })
  )
}