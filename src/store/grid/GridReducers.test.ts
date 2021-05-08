import { setValueOfActiveCell } from "./GridActions";
import { gridReducer } from "./GridReducers";
import { CellState, GridState, CellRowColumnKeys } from "./GridTypes";

const getInitialCellState = () => ({
  value: null,
  active: false,
  highlighted: false,
  invalid: false,
  initial: false
})

const getInitialGridState = () => {
  const state = {} as GridState
  CellRowColumnKeys.forEach(key => {
    state[key] = getInitialCellState()
  })

  return state
}

describe('Grid reducer', () => {

  it('should return the initial state', () => {
    const expectedInitialState = getInitialGridState()

    expect(gridReducer(undefined, null)).toEqual(expectedInitialState)
  });

  describe('Active cell', () => {

    it('should do nothing when no cell is active on SET_VALUE_OF_ACTIVE_CELL', () => {
      const expectedState = getInitialGridState()

      expect(gridReducer(getInitialGridState(), setValueOfActiveCell(5)))
        .toEqual(expectedState)
    });

    it('should set the value of the active cell on SET_VALUE_OF_ACTIVE_CELL', () => {
      const initialState = {
        ...getInitialGridState(),
        "cell_row5_column5": {
          ...getInitialCellState(),
          active: true
        }
      }

      const expectedState = {
        ...getInitialGridState(),
        "cell_row5_column5": {
          ...getInitialCellState(),
          active: true,
          value: 9
        }
      }

      expect(gridReducer(initialState, setValueOfActiveCell(9))).toEqual(expectedState)
    });
  });

});