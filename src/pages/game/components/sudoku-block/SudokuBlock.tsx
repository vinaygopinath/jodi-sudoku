import React from 'react';
import { Box, Grid } from 'grommet';
import './sudoku-block.scss';
import SudokuCell from '../sudoku-cell/SudokuCell';

type SudokuBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  position: number
}

export class SudokuBlock extends React.Component<SudokuBlockProps, {}> {

  getCellRow(cellPosition: number) {
    /**
     * Block positions are one-indexed
     * If the block position is 1,2, or 3, return 0
     * If the block position is 4,5, or 6, return 1
     * If the block position is 7,8, or 9, return 2
     */
    const blockRowNumber = Math.floor((this.props.position - 1) / 3)
    /**
     * Cell positions are one-indexed
     * If the cell position is 1,2, or 3, return 0
     * If the cell position is 4,5, or 6, return 1
     * If the cell position is 7,8, or 9, return 2
     */
    const cellRowNumber = Math.floor((cellPosition - 1) / 3)

    /**
     * If the block position is 1 (blockRowNumber = 0), and the cell position is 3 (cellRowNumber = 0),
     * it is the 3rd cell in the first block, i.e, cell row is 1
     *
     * If the block position is 8 (blockRowNumber = 2), and the cell position is 7 (cellRowNumber = 2),
     * it is the 7th cell in the 8th block, i.e, cell row is 9
     */
    return (blockRowNumber * 3) + cellRowNumber + 1
  }

  getCellColumn(cellPosition: number) {
    /**
     * Block positions are one-indexed
     * If the block position is 1,4, or 7, return 0
     * If the block position is 2,5, or 8, return 1
     * If the block position is 3,6, or 9, return 2
     */
    const blockColumnNumber = (this.props.position - 1) % 3
    /**
     * Cell positions are one-indexed
     * If the cell position is 1,4, or 7, return 0
     * If the cell position is 2,5, or 8, return 1
     * If the cell position is 3,6, or 9, return 2
     */
    const cellColumnNumner = (cellPosition - 1) % 3

    return (blockColumnNumber * 3) + cellColumnNumner + 1
  }

  render() {
    return (
      <Box className="block">
        {
          [0, 1, 2].map(i =>
            <Grid columns={{ count: 3, size: 'auto' }}>
              <SudokuCell row={this.getCellRow((3 * i) + 1)} column={this.getCellColumn((3 * i) + 1)} />
              <SudokuCell row={this.getCellRow((3 * i) + 2)} column={this.getCellColumn((3 * i) + 2)} />
              <SudokuCell row={this.getCellRow((3 * i) + 3)} column={this.getCellColumn((3 * i) + 3)} />
            </Grid>
          )
        }
      </Box>
    )
  }
}