import React from 'react';
import { RootState } from '../../../../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Keyboard } from 'grommet';
import { RowRange, ColumnRange, CellState } from '../../../../store/game/types';
import '../../../styles/_common.scss';

const mapState = (state: RootState) => ({

})

const mapDispatch = {

}

const connector = connect(mapState, mapDispatch)

type SudokuCellProps = ConnectedProps<typeof connector> & {
  row: typeof RowRange,
  column: typeof ColumnRange
}

class SudokuCell extends React.Component<SudokuCellProps, {}> {
  render() {
    return (
      <Box className="square" background="light-3">{this.props.row},{this.props.column}</Box>
    )
  }
}

export default connector(SudokuCell)