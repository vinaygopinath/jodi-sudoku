import React from 'react';
import { Heading, Box, Button, Text, ResponsiveContext, Grid } from "grommet"
import { RootState } from '../../store/rootReducer';
import { PlayerType } from '../../models/player/PlayerType';
import { PlayerActions } from '../../store/player/actions';
import { connect, ConnectedProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';

const mapState = (state: RootState) => ({
  difficultyLevel: state.player.difficultyLevel,
  playerType: state.player.playerType
})

const mapDispatch = {
  selectPlayerType: (playerType: PlayerType) => PlayerActions.selectPlayerType(playerType)
}

const connector = connect(mapState, mapDispatch)

type LandingProps = ConnectedProps<typeof connector> & WithTranslation & {
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

class LandingPage extends React.Component<LandingProps, {}> {
  showDifficultyLevelSubMenu(playerType: PlayerType) {
    this.props.selectPlayerType(playerType)
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
            <Button margin="small" size="large" color="neutral-1" label={this.getLocaleString('landing_difficulty_level_easy')} primary />
            <Button margin="small" size="large" color="neutral-2" label={this.getLocaleString('landing_difficulty_level_medium')} primary />
            <Button margin="small" size="large" color="neutral-3" label={this.getLocaleString('landing_difficulty_level_hard')} primary />
            <Button margin="small" size="large" color="neutral-4" label={this.getLocaleString('landing_difficulty_level_extreme')} primary />
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
            <Button margin="small" size="large" color="neutral-3" label={this.getLocaleString('landing_player_type_single')} primary onClick={() => this.showDifficultyLevelSubMenu(PlayerType.SINGLE_PLAYER)} />
            <Button margin="small" size="large" color="neutral-4" label={this.getLocaleString('landing_player_type_two')} primary onClick={() => this.showDifficultyLevelSubMenu(PlayerType.TWO_PLAYER)} />
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  getMenu() {
    if (this.props.playerType != null) {
      return this.getDifficultyLevelSubMenu()
    } else {
      return this.getMainMenu()
    }
  }

  getLocaleString(translationKey: string): String {
    return this.props.t(translationKey)
  }

  render() {
    return (
      <Box fill background="react">
        <Box flex align='center' justify='center'>
          <Heading margin="small">{this.getLocaleString('landing_app_title')}</Heading>
          <Text>{this.getLocaleString('landing_app_description')}</Text>
          <Text margin="small"></Text>
          {this.getMenu()}
        </Box>
      </Box>
    )
  }
}

export default connector(withTranslation('landing')(LandingPage))