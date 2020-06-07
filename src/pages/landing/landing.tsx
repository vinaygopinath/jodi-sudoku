import React from 'react';
import { Main, Heading, Box, Button, Text, Grommet, ResponsiveContext, Grid } from "grommet"
import { Notification } from 'grommet-icons'
import { DifficultyLevel } from '../../models/player/DifficultyLevel';
import { RootState } from '../../store/rootReducer';
import { PlayerState } from '../../store/player/types';
import { PlayerType } from '../../models/player/PlayerType';
import { PlayerActions } from '../../store/player/actions';
import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: RootState) => ({
  difficultyLevel: state.player.difficultyLevel
})

const mapDispatch = {
  selectPlayerType: (playerType: PlayerType) => PlayerActions.selectPlayerType(playerType)
}

const connector = connect(mapState, mapDispatch)

type LandingProps = ConnectedProps<typeof connector> & {

}

class AppBar extends React.Component {
  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: 1 }}
        {...this.props}
      />
    )
  }
}

class Landing extends React.Component<LandingProps, {}> {
  showDifficultyLevelSubMenu(playerType: PlayerType) {
    console.log(`showDifficultyLevelSubMenu called with playerType ${playerType}`)
    this.setState(
      {
        playerType: playerType,
        isSubMenuDisplayed: true,
        isDifficultLevelSubMenuDisplayed: true
      }
    )
  }

  getDifficultyLevelSubMenu() {
    return (
      <ResponsiveContext.Consumer >
        {size => (
          <Grid columns={size === 'small' ? ["full"] : ["1/4", "1/4", "1/4", "1/4"]}>
            <Button margin="small" size="large" color="neutral-1" label="Easy" primary/>
            <Button margin="small" size="large" color="neutral-2" label="Medium" primary/>
            <Button margin="small" size="large" color="neutral-3" label="Hard" primary/>
            <Button margin="small" size="large" color="neutral-4" label="Extreme" primary/>
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  getMainMenu() {
    return (
      <ResponsiveContext.Consumer >
        {size => (
          <Grid columns={size === 'small' ? ["full"] : ["1/2", "1/2"]}>
            <Button margin="small" size="large" color="neutral-3" label="Single Player" primary onClick={() => this.showDifficultyLevelSubMenu(PlayerType.SINGLE_PLAYER)} />
            <Button margin="small" size="large" color="neutral-4" label="Two Player" primary onClick={() => this.showDifficultyLevelSubMenu(PlayerType.TWO_PLAYER)} />
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  render() {
    return (
      <Box fill background="react">
        <Box flex align='center' justify='center'>
          <Heading margin="small">Jodi Sudoku</Heading>
          <Text>Play Sudoku with others</Text>
          <Text margin="small"></Text>
          {this.getMainMenu()}
        </Box>
      </Box>
    )
  }
}

export default connector(Landing)