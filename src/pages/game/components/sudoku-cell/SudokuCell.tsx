import React from 'react';
import { RootState } from '../../../../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Box } from 'grommet';
import { RowRange, ColumnRange, getCellStateKey, CellValueRange, GameActionTypes } from '../../../../store/game/game-types';
import './sudoku-cell.scss';
import { changeCellFocus } from '../../../../store/game/game-actions';
import { Dispatch } from 'redux';
import classnames from 'classnames'

const mapState = (state: RootState, ownProps: { row: RowRange, column: ColumnRange }) => {
  const cellStateKey = getCellStateKey(ownProps.row, ownProps.column)
  const cellState = state.game[cellStateKey]

  return {
    value: cellState.value,
    active: cellState.active,
    highlighted: cellState.highlighted,
    invalid: cellState.invalid,
    initial: cellState.initial
  }
}

const mapDispatchToProps = (dispatch: Dispatch<GameActionTypes>, ownProps: { row: RowRange, column: ColumnRange }) => {
  return {
    changeFocus: (isFocussed: boolean) => {
      dispatch(changeCellFocus(ownProps.row, ownProps.column, isFocussed))
    }
  }
}

const connector = connect(mapState, mapDispatchToProps)

type SudokuCellProps = ConnectedProps<typeof connector> & {
  row: RowRange,
  column: ColumnRange,
  active?: boolean,
  highlighted?: boolean,
  invalid?: boolean,
  value: CellValueRange | null
}

type SudokuCellState = {

}

class SudokuCell extends React.PureComponent<SudokuCellProps, SudokuCellState> {

  render() {
    // console.log(`Rendering cell ${getCellStateKey(this.props.row, this.props.column)} with active ${this.props.active!!}`);
    const contentClasses = classnames({
      'cell-content': true,
      active: this.props.active,
      initial: this.props.initial
    })
    return (
      <Box border className="cell" background={`light-${(this.props.column % 3) + 1}`} hoverIndicator focusIndicator={false} onClick={(e: any) => this.props.changeFocus(true)}>
        <div className={contentClasses}>{this.props.value || ''}</div>
      </Box>
    )
  }

  addDummyBoxIfActive() {
    return this.props.active && (
      <div style={{ backgroundColor: 'orange', width: '10px', height: '10px'}}>

      </div>
    )
  }
}

export default connector(SudokuCell)