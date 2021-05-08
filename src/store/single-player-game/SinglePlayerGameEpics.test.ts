import { Subject } from "rxjs"
import * as SinglePlayerGameEpics from "./SinglePlayerGameEpics"
import * as Actions from "./SinglePlayerGameActions"
import { SudokuUtils } from '../../utils/SudokuUtils'
import { toArray } from 'rxjs/operators';
import { ActionsObservable, StateObservable } from "redux-observable";
import { RootState } from "../RootReducer";
import { PLAYER_INITIAL_STATE } from "../player/PlayerReducers";
import { SINGLE_PLAYER_GAME_INITIAL_STATE } from "./SinglePlayerGameReducers";
import { MULTIPLAYER_GAME_INITIAL_STATE } from "../multiplayer-game/MultiplayerGameReducers";
import { GRID_INITIAL_STATE } from "../grid/GridReducers";
import { CellRowColumnKeyType, GridActionTypes } from "../grid/GridTypes";
import { TestStateHelper } from '../../../tests/helpers/TestStateHelper'
import { DifficultyLevel } from "../../models/player/DifficultyLevel";
import { initialiseCell, resetCell } from "../grid/GridActions";

describe('Single player game epics', () => {

  it('should do nothing when the difficulty level is not set', done => {
    const inputAction = ActionsObservable.of(Actions.generateSudokuPuzzle())

    const inputState = new StateObservable<RootState>(new Subject(), TestStateHelper.createRootState())

    SinglePlayerGameEpics.generateSudokuPuzzle(inputAction, inputState).toPromise()
      .then(
        (actualActions: GridActionTypes) => {
          expect(actualActions).toBeUndefined()
          done()
        }
      )
  });

  it('should create initialise actions for cells with values in the generated puzzle', (done) => {
    const someDifficultyLevel = DifficultyLevel.HARD
    const inputAction = ActionsObservable.of(Actions.generateSudokuPuzzle())
    const inputState = new StateObservable<RootState>(
      new Subject(),
      TestStateHelper.createRootState({
        singlePlayerGame: TestStateHelper.createSinglePlayerGameState({
          difficultyLevel: someDifficultyLevel
        })
      })
    )
    const puzzle = SudokuUtils.generateSudokuPuzzle(someDifficultyLevel)
    const keysOfCellsWithValues = Object.keys(puzzle).filter(key => puzzle[key as CellRowColumnKeyType]!!)
    const expectedActions = keysOfCellsWithValues.map(key => {
      const cellKey = key as CellRowColumnKeyType
      const { row, column } = SudokuUtils.getRowAndColumnFromCellKey(cellKey)
      return initialiseCell(row, column, puzzle[cellKey])
    })
    jest.spyOn(SudokuUtils, 'generateSudokuPuzzle')
    .mockImplementation(() => puzzle)


    SinglePlayerGameEpics.generateSudokuPuzzle(inputAction, inputState)
    .pipe(toArray()) // get all actions, not just the first
    .toPromise()
    .then(
      (actualActions: GridActionTypes[]) => {
        expect(actualActions).toIncludeAllMembers(expectedActions)
        done()
      }
    )
  });

  it('should create reset actions for cells without values in the generated puzzle', (done) => {
    const someDifficultyLevel = DifficultyLevel.HARD
    const inputAction = ActionsObservable.of(Actions.generateSudokuPuzzle())
    const inputState = new StateObservable<RootState>(
      new Subject(),
      TestStateHelper.createRootState({
        singlePlayerGame: TestStateHelper.createSinglePlayerGameState({
          difficultyLevel: someDifficultyLevel
        })
      })
    )
    const puzzle = SudokuUtils.generateSudokuPuzzle(someDifficultyLevel)
    const keysOfCellsWithValues = Object.keys(puzzle).filter(key => !puzzle[key as CellRowColumnKeyType])
    const expectedActions = keysOfCellsWithValues.map(key => {
      const { row, column } = SudokuUtils.getRowAndColumnFromCellKey(key as CellRowColumnKeyType)
      return resetCell(row, column)
    })
    jest.spyOn(SudokuUtils, 'generateSudokuPuzzle')
    .mockImplementation(() => puzzle)


    SinglePlayerGameEpics.generateSudokuPuzzle(inputAction, inputState)
    .pipe(toArray()) // get all actions, not just the first
    .toPromise()
    .then(
      (actualActions: GridActionTypes[]) => {
        expect(actualActions).toIncludeAllMembers(expectedActions)
        done()
      }
    )
  });

});