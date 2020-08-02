import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RootState } from '../../store/rootReducer';
import { Box, Grid, ResponsiveContext } from 'grommet';

const mapState = (state: RootState) => ({
  difficultyLevel: state.player.difficultyLevel,
  playerType: state.player.playerType
})

const mapDispatch = {

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
      case 'small':return ['full']
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


  render() {

    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Grid fill rows={this.getLayoutRowsForSize(size)} columns={this.getLayoutColumnsForSize(size)} areas={this.getLayoutGridAreasForSize(size)}>
            <Box background="green"></Box>
            <Box background="orange"></Box>
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}

export default connector(withTranslation('game')(GamePage))