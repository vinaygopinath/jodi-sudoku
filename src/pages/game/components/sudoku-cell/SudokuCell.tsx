import React from 'react';
import { RootState } from '../../../../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Keyboard } from 'grommet';
import { RowRange, ColumnRange, CellState } from '../../../../store/game/game-types';
import './sudoku-cell.scss';

const mapState = (state: RootState) => ({
  cell_row1_column1: state.game.cell_row1_column1,
  cell_row1_column2: state.game.cell_row1_column2,
  cell_row1_column3: state.game.cell_row1_column3,
  cell_row1_column4: state.game.cell_row1_column4,
  cell_row1_column5: state.game.cell_row1_column5,
  cell_row1_column6: state.game.cell_row1_column6,
  cell_row1_column7: state.game.cell_row1_column7,
  cell_row1_column8: state.game.cell_row1_column8,
  cell_row1_column9: state.game.cell_row1_column9,
  cell_row2_column1: state.game.cell_row2_column1,
  cell_row2_column2: state.game.cell_row2_column2,
  cell_row2_column3: state.game.cell_row2_column3,
  cell_row2_column4: state.game.cell_row2_column4,
  cell_row2_column5: state.game.cell_row2_column5,
  cell_row2_column6: state.game.cell_row2_column6,
  cell_row2_column7: state.game.cell_row2_column7,
  cell_row2_column8: state.game.cell_row2_column8,
  cell_row2_column9: state.game.cell_row2_column9,
  cell_row3_column1: state.game.cell_row3_column1,
  cell_row3_column2: state.game.cell_row3_column2,
  cell_row3_column3: state.game.cell_row3_column3,
  cell_row3_column4: state.game.cell_row3_column4,
  cell_row3_column5: state.game.cell_row3_column5,
  cell_row3_column6: state.game.cell_row3_column6,
  cell_row3_column7: state.game.cell_row3_column7,
  cell_row3_column8: state.game.cell_row3_column8,
  cell_row3_column9: state.game.cell_row3_column9,
  cell_row4_column1: state.game.cell_row4_column1,
  cell_row4_column2: state.game.cell_row4_column2,
  cell_row4_column3: state.game.cell_row4_column3,
  cell_row4_column4: state.game.cell_row4_column4,
  cell_row4_column5: state.game.cell_row4_column5,
  cell_row4_column6: state.game.cell_row4_column6,
  cell_row4_column7: state.game.cell_row4_column7,
  cell_row4_column8: state.game.cell_row4_column8,
  cell_row4_column9: state.game.cell_row4_column9,
  cell_row5_column1: state.game.cell_row5_column1,
  cell_row5_column2: state.game.cell_row5_column2,
  cell_row5_column3: state.game.cell_row5_column3,
  cell_row5_column4: state.game.cell_row5_column4,
  cell_row5_column5: state.game.cell_row5_column5,
  cell_row5_column6: state.game.cell_row5_column6,
  cell_row5_column7: state.game.cell_row5_column7,
  cell_row5_column8: state.game.cell_row5_column8,
  cell_row5_column9: state.game.cell_row5_column9,
  cell_row6_column1: state.game.cell_row6_column1,
  cell_row6_column2: state.game.cell_row6_column2,
  cell_row6_column3: state.game.cell_row6_column3,
  cell_row6_column4: state.game.cell_row6_column4,
  cell_row6_column5: state.game.cell_row6_column5,
  cell_row6_column6: state.game.cell_row6_column6,
  cell_row6_column7: state.game.cell_row6_column7,
  cell_row6_column8: state.game.cell_row6_column8,
  cell_row6_column9: state.game.cell_row6_column9,
  cell_row7_column1: state.game.cell_row7_column1,
  cell_row7_column2: state.game.cell_row7_column2,
  cell_row7_column3: state.game.cell_row7_column3,
  cell_row7_column4: state.game.cell_row7_column4,
  cell_row7_column5: state.game.cell_row7_column5,
  cell_row7_column6: state.game.cell_row7_column6,
  cell_row7_column7: state.game.cell_row7_column7,
  cell_row7_column8: state.game.cell_row7_column8,
  cell_row7_column9: state.game.cell_row7_column9,
  cell_row8_column1: state.game.cell_row8_column1,
  cell_row8_column2: state.game.cell_row8_column2,
  cell_row8_column3: state.game.cell_row8_column3,
  cell_row8_column4: state.game.cell_row8_column4,
  cell_row8_column5: state.game.cell_row8_column5,
  cell_row8_column6: state.game.cell_row8_column6,
  cell_row8_column7: state.game.cell_row8_column7,
  cell_row8_column8: state.game.cell_row8_column8,
  cell_row8_column9: state.game.cell_row8_column9,
  cell_row9_column1: state.game.cell_row9_column1,
  cell_row9_column2: state.game.cell_row9_column2,
  cell_row9_column3: state.game.cell_row9_column3,
  cell_row9_column4: state.game.cell_row9_column4,
  cell_row9_column5: state.game.cell_row9_column5,
  cell_row9_column6: state.game.cell_row9_column6,
  cell_row9_column7: state.game.cell_row9_column7,
  cell_row9_column8: state.game.cell_row9_column8,
  cell_row9_column9: state.game.cell_row9_column9
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
      <Keyboard onKeyDown={(key) => { console.log(`Key is ${key.key}`); }} target="document">
        <Box className="cell" background={`light-${(this.props.column % 3) + 1}`}>
          <div className="cell-content">
            {this.props.row},{this.props.column}
        </div>
      </Box>
      </Keyboard>
    )
  }
}

export default connector(SudokuCell)