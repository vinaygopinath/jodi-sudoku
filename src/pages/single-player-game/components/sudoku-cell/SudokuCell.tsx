import React from 'react';
import { RootState } from '../../../../store/RootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Box } from 'grommet';
import { RowRange, ColumnRange, CellValueRange } from '../../../../store/grid/GridTypes';
import './sudoku-cell.scss';
import { changeCellFocus, setValueOfActiveCell, setSelectedCellValue } from '../../../../store/grid/GridActions';
import classnames from 'classnames'
import { SudokuUtils } from '../../../../utils/SudokuUtils';
import { ValueEntryMode } from '../../../../models/game/ValueEntryMode';

const mapState = (state: RootState, ownProps: { row: RowRange, column: ColumnRange }) => {
  const cellStateKey = SudokuUtils.getCellKey(ownProps.row, ownProps.column)
  const cellState = state.grid.present[cellStateKey]

  return {
    value: cellState.value,
    active: cellState.active,
    highlighted: cellState.highlighted,
    invalid: cellState.invalid,
    initial: cellState.initial,
    valueEntryMode: state.singlePlayerGame.valueEntryMode,
    activeDigit: state.singlePlayerGame.activeDigit
  }
}

const mapDispatchToProps = {
    changeFocus: (row: RowRange, column: ColumnRange, isFocussed: boolean) => changeCellFocus(row, column, isFocussed),
    setActiveCellValue: (cellValue: CellValueRange) => setValueOfActiveCell(cellValue),
    setSelectedCellValue: (row: RowRange, column: ColumnRange, cellValue: CellValueRange,) => setSelectedCellValue(row, column, cellValue)
}

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

  setFocusOrSetCellValue() {
    if (this.props.valueEntryMode === ValueEntryMode.DIGIT_FIRST && this.props.activeDigit != null) {
      this.props.setSelectedCellValue(this.props.row, this.props.column, this.props.activeDigit)
    } else {
      this.props.changeFocus(this.props.row, this.props.column, true)
    }
  }

  render() {
    const contentClasses = classnames({
      'cell': true,
      active: this.props.active,
      initial: this.props.initial
    })
    return (
      <Box className={contentClasses} border={false} focusIndicator={false} onClick={() => this.setFocusOrSetCellValue()}>
        <div className="cell-content">{this.props.value || ''}</div>
      </Box>
    )
  }
}

export default connector(SudokuCell)