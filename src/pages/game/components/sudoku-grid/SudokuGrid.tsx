import React from 'react';
import { RootState } from '../../../../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { SudokuBlock } from '../sudoku-block/SudokuBlock';
import { Box, Grid } from 'grommet';
import './sudoku-grid.scss';

const mapState = (state: RootState) => ({

})

const mapDispatch = {

}

const connector = connect(mapState, mapDispatch)

type GridProps = ConnectedProps<typeof connector> & {
}

type GridState = {
  maxDimension: string,
  horizontalMargin: string
}

class SudokuGrid extends React.Component<GridProps, {}> {

  state = {
    maxDimension: '100%',
    horizontalMargin: '0'
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateGridDimensions)
    this.updateGridDimensions()
  }

  updateGridDimensions = () => {
    const element = document.querySelector('#grid-section')
    if (element != null) {
      const rect = element.getBoundingClientRect()
      // The 3 x 3 grid of blocks must be a square that takes up at most
      // the minimum of the height and width of the grid section
      const maxDimension = Math.min(rect.width, rect.height)
      // Center the sudoku grid in the grid section
      const horizontalMargin = (rect.width - maxDimension) / 2
      this.setState({
        maxDimension: `${maxDimension}px`,
        horizontalMargin: horizontalMargin
      })
    }
  }

  render() {
    return (
      <Box fill style={{ maxHeight: this.state.maxDimension, maxWidth: this.state.maxDimension, marginLeft: this.state.horizontalMargin, marginRight: this.state.horizontalMargin }}>
        {
          [0, 1, 2].map(i =>
            <Grid columns={{ count: 3, size: 'auto' }}>
              <SudokuBlock position={(3 * i) + 1} />
              <SudokuBlock position={(3 * i) + 2}/>
              <SudokuBlock position={(3 * i) + 3}/>
            </Grid>
          )
        }
      </Box>
    )
  }
}

export default connector(SudokuGrid)