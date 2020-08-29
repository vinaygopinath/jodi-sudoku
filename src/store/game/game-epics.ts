import { ActionsObservable, combineEpics, StateObservable, ofType } from 'redux-observable'
import { Action } from '../../models/common/Action'
import * as SudokuUtils from '../../utils/SudokuUtils'
import { RootState } from '../rootReducer'
import { mergeMap } from 'rxjs/operators'
import { CellRowColumnKeyType, GridActionTypes } from '../grid/grid-types'
import { SudokuPuzzle } from '../../models/sudoku/SudokuPuzzle'
import { initialiseCell } from '../grid/grid-actions'
import { GENERATE_SUDOKU_PUZZLE } from './game-types'
import { from, EMPTY } from 'rxjs'
import { DifficultyLevel } from '../../models/player/DifficultyLevel'
import { ActionCreators } from 'redux-undo'

export const gameEpics = combineEpics(
  generateSudokuPuzzle
)

function generateSudokuPuzzle(
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(GENERATE_SUDOKU_PUZZLE),
    mergeMap(() => {
      const difficultyLevel = state$.value.player.difficultyLevel || DifficultyLevel.EASY
      if (!difficultyLevel) {
        console.error('Generate sudoku puzzle called when difficulty level was not set')
        return EMPTY
      }

      const puzzle = SudokuUtils.generateSudokuPuzzle(difficultyLevel)
      const initialiseActions = createInitialiseActionsForPuzzle(puzzle).concat(ActionCreators.clearHistory())
      return from(initialiseActions)
    })
  )
}

export function createInitialiseActionsForPuzzle(puzzle: SudokuPuzzle): Array<GridActionTypes> {
  return Object.keys(puzzle)
  .filter(key => puzzle[key as CellRowColumnKeyType]!!) // Don't create initialise actions for cells without values
  .map(key => {
    const cellKey = key as CellRowColumnKeyType
    const { row, column } = SudokuUtils.getRowAndColumnFromCellKey(cellKey)
    return initialiseCell(row, column, puzzle[cellKey])
  })
}