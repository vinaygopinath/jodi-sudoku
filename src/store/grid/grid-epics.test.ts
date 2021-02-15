import { ActionsObservable, StateObservable } from "redux-observable";
import { EMPTY, of, Subject, pipe } from "rxjs";
import { changeCellFocus, setValueOfActiveCell } from "./grid-actions";
import { SET_VALUE_OF_ACTIVE_CELL } from "./grid-types";
import { markGameAsCompletedAndSolved } from "./grid-epics"
import { RootState } from "../rootReducer"
import { GAME_INITIAL_STATE } from "../game/game-reducers";
import { PLAYER_INITIAL_STATE } from "../player/player-reducers";
import { GRID_INITIAL_STATE } from "./grid-reducers";
import { toArray, take } from "rxjs/operators";
import { toggleGameComplete, toggleGameSolved } from "../game/game-actions";
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import 'jest-extended'

import * as SudokuUtils from '../../utils/SudokuUtils';

jest.mock('../../utils/SudokuUtils');

const getRootState: () => RootState = () => ({
  game: GAME_INITIAL_STATE,
  player: PLAYER_INITIAL_STATE,
  grid: {
    past: [],
    present: GRID_INITIAL_STATE,
    future: []
  }
})
describe('Grid epic', () => {

  let gridCompleteMock: jest.Mock
  let gridSolvedMock: jest.Mock

  beforeEach(() => {
    gridCompleteMock = SudokuUtils.isGridComplete as jest.Mock
    gridSolvedMock = SudokuUtils.isGridSolved as jest.Mock
  })

  afterEach(() => {
    gridCompleteMock.mockReset()
    gridSolvedMock.mockReset()
  })

  describe('mark game as completed and solved', () => {

    it('should do nothing when the action is unrelated', (done) => {
      const action$ = new ActionsObservable(
        of(changeCellFocus(4, 5, true))
      )
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      gridCompleteMock.mockReturnValueOnce(true)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toBeEmpty()
          done()
        })
    });

    it('should do nothing when the grid is incomplete', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      gridCompleteMock.mockReturnValueOnce(false)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toBeEmpty()
          done()
        })
    });

    it('should emit game completion when the grid is complete', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )

      gridCompleteMock.mockReturnValue(true)
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toContainEqual(toggleGameComplete(true))
          done()
        })
    });

    it('should emit game completion when the grid is complete and game state is not completed', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      gridCompleteMock.mockReturnValueOnce(true)
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())

      markGameAsCompletedAndSolved(action$, state$)
        .subscribe((action) => {
          expect(action).toEqual(toggleGameComplete(true))
          done()
        })
    });

    it('should not emit game completion when the grid is complete and game state is already marked as complete', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      const rootState = getRootState()
      const initialState: RootState = {
        ...rootState,
        game: {
          ...rootState.game,
          isCompleted: true
        }
      }
      gridCompleteMock.mockReturnValueOnce(true)
      const state$ = new StateObservable<RootState>(new Subject(), initialState)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toEqual([])
          done()
        })
    });

    it('should emit game solved when the grid is solved', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      gridCompleteMock.mockReturnValueOnce(true)
      gridSolvedMock.mockReturnValueOnce(true)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toContainEqual(toggleGameSolved(true))
          done()
        })
    });

    it('should clear history when the grid is solved', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      gridCompleteMock.mockReturnValueOnce(true)
      gridSolvedMock.mockReturnValueOnce(true)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toContainEqual(UndoActionCreators.clearHistory())
          done()
        })
    });

    it('should pause the clock when the grid is solved', (done) => {
      const action$ = new ActionsObservable(
        of(setValueOfActiveCell(5))
      )
      const state$ = new StateObservable<RootState>(new Subject(), getRootState())
      gridCompleteMock.mockReturnValueOnce(true)
      gridSolvedMock.mockReturnValueOnce(true)

      markGameAsCompletedAndSolved(action$, state$)
        .pipe(take(10), toArray())
        .subscribe((action) => {
          expect(action).toContainEqual(UndoActionCreators.clearHistory())
          done()
        })
    });
  });

});