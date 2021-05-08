import React from 'react';
import { RootState } from '../../../../store/RootReducer';
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
  maxDimension: string
}

class SudokuGrid extends React.PureComponent<GridProps, {}> {

  state = {
    maxDimension: '100%',
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
      this.setState({
        // 6% is the total of the top and bottom margins defined
        // for .sudoku-grid in sudoku-grid.scss
        maxDimension: `calc(${maxDimension}px - 6%)`
      })
    }
  }

  render() {
    return (
      <Box className="sudoku-grid" fill style={{ maxHeight: this.state.maxDimension, maxWidth: this.state.maxDimension, marginLeft: `auto`, marginRight: `auto` }}>
        {
          [0, 1, 2].map(i =>
            <Grid columns={{ count: 3, size: 'auto' }} key={i}>
              <SudokuBlock position={(3 * i) + 1}/>
              <SudokuBlock position={(3 * i) + 2}/>
              <SudokuBlock position={(3 * i) + 3}/>
            </Grid>
          )
        }
      </Box>
    )
  }
}

// Re-enable when redux state/dispatcher is required
// export default connector(SudokuGrid)
export default SudokuGrid