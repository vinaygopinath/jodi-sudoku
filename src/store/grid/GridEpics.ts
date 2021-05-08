import { ActionsObservable, combineEpics, StateObservable, ofType } from "redux-observable";
import { Action } from '../../models/common/Action'
import { CLEAR_CELL_VALUE, RESET_CELL, SET_SELECTED_CELL_VALUE, SET_VALUE_OF_ACTIVE_CELL } from "./GridTypes";
import { RootState } from '../RootReducer'
import { filter, mergeMap } from 'rxjs/operators'
import { SudokuUtils } from "../../utils/SudokuUtils";
import { EMPTY, from } from "rxjs";
import { pauseSudokuClock, resumeSudokuClock, toggleGameComplete, toggleGameSolved } from "../single-player-game/SinglePlayerGameActions";
import { ActionTypes as UndoActions, ActionCreators as UndoActionCreators } from 'redux-undo';
import { AnalyticsUtils } from "../../utils/AnalyticsUtils";
import { PlayerType } from "../../models/player/PlayerType";

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
      const isComplete = SudokuUtils.isGridComplete(state$.value.grid.present)
      if (!isComplete) {
        return EMPTY
      }

      const actions: Action[] = []
      if (isComplete && !state$.value.singlePlayerGame.isCompleted) {
        actions.push(toggleGameComplete(true))
      }
      if (SudokuUtils.isGridSolved(state$.value.grid.present)) {
        const singlePlayerDifficultyLevel = state$.value.singlePlayerGame.difficultyLevel
        const multiplayerDifficultyLevel = state$.value.multiplayerGame.difficultyLevel
        if (singlePlayerDifficultyLevel != null) {
          AnalyticsUtils.logSolveGame(PlayerType.SINGLE_PLAYER, singlePlayerDifficultyLevel)
        } else if (multiplayerDifficultyLevel != null) {
          AnalyticsUtils.logSolveGame(PlayerType.MULTIPLAYER, multiplayerDifficultyLevel)
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
    filter(() => state$.value.singlePlayerGame.isCompleted && !SudokuUtils.isGridComplete(state$.value.grid.present)),
    mergeMap(() => {
      const actions: Action[] = [toggleGameComplete(false)]
      if (state$.value.singlePlayerGame.isSolved) {
        actions.push(toggleGameSolved(false), resumeSudokuClock())
      }

      return from(actions)
    })
  )
}