import React from 'react';
import { RootState } from '../../../../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Box } from 'grommet';
import { RowRange, ColumnRange, CellValueRange } from '../../../../store/grid/grid-types';
import './sudoku-cell.scss';
import { changeCellFocus } from '../../../../store/grid/grid-actions';
import { Dispatch, AnyAction } from 'redux';
import classnames from 'classnames'
import { getCellKey } from '../../../../utils/SudokuUtils';

const mapState = (state: RootState, ownProps: { row: RowRange, column: ColumnRange }) => {
  const cellStateKey = getCellKey(ownProps.row, ownProps.column)
  const cellState = state.grid.present[cellStateKey]

  return {
    value: cellState.value,
    active: cellState.active,
    highlighted: cellState.highlighted,
    invalid: cellState.invalid,
    initial: cellState.initial
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: { row: RowRange, column: ColumnRange }) => ({
    changeFocus: (isFocussed: boolean) => {
      dispatch(changeCellFocus(ownProps.row, ownProps.column, isFocussed))
    }
})

const connector = connect(mapState, mapDispatchToProps)

type SudokuCellProps = ConnectedProps<typeof connector> & {
  row: RowRange,
  column: ColumnRange,
  active?: boolean,
  highlighted?: boolean,
  invalid?: boolean,
  value: CellValueRange | null,
  initial?: boolean
}

type SudokuCellState = {

}

class SudokuCell extends React.PureComponent<SudokuCellProps, SudokuCellState> {

  render() {
    // console.log(`Rendering cell ${getCellStateKey(this.props.row, this.props.column)} with active ${this.props.active!!}`);
    const contentClasses = classnames({
      'cell': true,
      active: this.props.active,
      initial: this.props.initial
    })
    return (
      <Box className={contentClasses} border={false} focusIndicator={false} onClick={(e: any) => this.props.changeFocus(true)}>
        <div className="cell-content">{this.props.value || ''}</div>
      </Box>
    )
  }
}

export default connector(SudokuCell)