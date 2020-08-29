import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RootState } from '../../store/rootReducer';
import { Box, Grid, Keyboard, ResponsiveContext } from 'grommet';
import SudokuGrid from './components/sudoku-grid/SudokuGrid';
import { ArrowKey, isArrowKey, getArrowKey, isCellValueKey, getCellValueKey, isDeleteOrBackspaceKey } from '../../utils/KeyboardUtils';
import { moveCellFocusByArrowKey, enterCellValue, clearCellValue } from '../../store/game/game-actions';
import { CellValueRange } from '../../store/game/game-types';

const mapState = (state: RootState) => ({
  difficultyLevel: state.player.difficultyLevel,
  playerType: state.player.playerType
})

const mapDispatch = {
  moveCellFocusByArrowKey: (arrowKey: ArrowKey) => moveCellFocusByArrowKey(arrowKey),
  enterCellValue: (value: CellValueRange) => enterCellValue(value),
  clearCellValue: () => clearCellValue()
}

const connector = connect(mapState, mapDispatch)

type GameProps = ConnectedProps<typeof connector> & WithTranslation & {

}

class GamePage extends React.Component<GameProps, {}> {

  getLayoutRowsForSize(size: string): string[] {
    switch (size) {
      case 'small': return ['3/4', '1/4']
      default: return ['full']
    }
  }

  getLayoutColumnsForSize(size: string): string[] {
    switch (size) {
      case 'small': return ['full']
      default: return ['3/4', '1/4']
    }
  }

  getLayoutGridAreasForSize(size: string): { name?: string, start?: number[], end?: number[] }[] {
    switch (size) {
      case 'small':
        return [
          /**
           * Small screens use a two-row approach.
           * The first row takes up 75% of the height (and full width) for the game area
           * The second row takes up 25% of the height (and full width) for the options/buttons area
           */
          { name: 'game', start: [0, 0], end: [0, 0] },
          { name: 'options', start: [0, 1], end: [0, 1] }
        ]
      default: return [
        /**
         * Medium, large and xlarge screens use a two-column approach.
         * The first row takes up 75% of the width (and full height) for the game area
         * The second row takes up 25% of the width (and full height) for the options/buttons area
         */
        { name: 'game', start: [0, 0], end: [0, 0] },
        { name: 'options', start: [1, 0], end: [1, 0] },
      ]
    }
  }

  handleKeyboardEvent(event: React.KeyboardEvent<HTMLElement>) {
    const isArrow = isArrowKey(event)
    const isCellValue = isCellValueKey(event)
    const isDeleteOrBackspace = isDeleteOrBackspaceKey(event)
    if (!isArrow && !isCellValue && !isDeleteOrBackspace) {
      return
    }

    event.preventDefault()
    if (isCellValue) {
      const numberKey = getCellValueKey(event)
      this.props.enterCellValue(numberKey)
    } else if (isArrow) {
      const arrowKey = getArrowKey(event)
      this.props.moveCellFocusByArrowKey(arrowKey)
    } else if (isDeleteOrBackspace) {
      this.props.clearCellValue()
    }
  }


  render() {

    return (
      <Keyboard onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => { console.log(`Key is ${event.key}`); this.handleKeyboardEvent(event) }} target="document">
        <ResponsiveContext.Consumer>
          {size => (
            <Grid fill rows={this.getLayoutRowsForSize(size)} columns={this.getLayoutColumnsForSize(size)} areas={this.getLayoutGridAreasForSize(size)}>
              <Box id="grid-section" background="green">
                <SudokuGrid />
              </Box>
              <Box background="orange"></Box>
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </Keyboard>
    )
  }
}

export default connector(withTranslation('game')(GamePage))