import { ActionsObservable, combineEpics, StateObservable, ofType } from 'redux-observable'
import { Action } from '../../models/common/Action'
import { SudokuUtils } from '../../utils/SudokuUtils'
import { RootState } from '../RootReducer'
import { mergeMap } from 'rxjs/operators'
import { CellRowColumnKeyType, GridActionTypes } from '../grid/GridTypes'
import { SudokuPuzzle } from '../../models/sudoku/SudokuPuzzle'
import { initialiseCell, resetCell } from '../grid/GridActions'
import { GENERATE_SUDOKU_PUZZLE } from './SinglePlayerGameTypes'
import { from, EMPTY } from 'rxjs'
import { ActionCreators } from 'redux-undo'
import { AnalyticsUtils } from "../../utils/AnalyticsUtils"
import { PlayerType } from '../../models/player/PlayerType'

export const gameEpics = combineEpics(
  generateSudokuPuzzle
)

export function generateSudokuPuzzle(
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(GENERATE_SUDOKU_PUZZLE),
    mergeMap(() => {
      const difficultyLevel = state$.value.singlePlayerGame.difficultyLevel
      if (!difficultyLevel) {
        AnalyticsUtils.logException("Generate sudoku puzzle called when difficulty level was not set")
        return EMPTY
      }

      const puzzle = SudokuUtils.generateSudokuPuzzle(difficultyLevel)
      const initialiseActions = createInitialiseActionsForPuzzle(puzzle).concat(ActionCreators.clearHistory())

      AnalyticsUtils.logStartGame(PlayerType.SINGLE_PLAYER, difficultyLevel)

      return from(initialiseActions)
    })
  )
}

function createInitialiseActionsForPuzzle(puzzle: SudokuPuzzle): Array<GridActionTypes> {
  const initialCellActions = Object.keys(puzzle)
    .filter(key => puzzle[key as CellRowColumnKeyType]!!) // Don't create initialise actions for cells without values
    .map(key => {
      const cellKey = key as CellRowColumnKeyType
      const { row, column } = SudokuUtils.getRowAndColumnFromCellKey(cellKey)
      return initialiseCell(row, column, puzzle[cellKey])
    })

  const resetExistingActions = Object.keys(puzzle)
    .filter(key => !puzzle[key as CellRowColumnKeyType]) // Reset cell contents for empty puzzle cells
    .map(key => {
      const cellKey = key as CellRowColumnKeyType
      const { row, column } = SudokuUtils.getRowAndColumnFromCellKey(cellKey)
      return resetCell(row, column)
    })

  return initialCellActions.concat(resetExistingActions)
}