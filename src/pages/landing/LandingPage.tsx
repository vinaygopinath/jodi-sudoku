import React from 'react';
import { Heading, Box, Button, Text, ResponsiveContext, Grid } from "grommet"
import { RootState } from '../../store/rootReducer';
import { PlayerType } from '../../models/player/PlayerType';
import { PlayerActions } from '../../store/player/player-actions';
import { connect, ConnectedProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { DifficultyLevel } from '../../models/player/DifficultyLevel';
import { Redirect } from 'react-router-dom';

const mapState = (state: RootState) => ({
  difficultyLevel: state.player.difficultyLevel,
  playerType: state.player.playerType
})

const mapDispatch = {
  selectPlayerType: (playerType: PlayerType) => PlayerActions.selectPlayerType(playerType),
  selectDifficultyLevel: (difficultyLevel: DifficultyLevel) => PlayerActions.selectDifficultyLevel(difficultyLevel)
}

const connector = connect(mapState, mapDispatch)

type LandingProps = ConnectedProps<typeof connector> & WithTranslation & {
}

type LandingState = {
  redirectPath: string | null
}

class LandingPage extends React.Component<LandingProps, LandingState> {

  state = {
    redirectPath: null
  }

  showDifficultyLevelSubMenu(playerType: PlayerType) {
    this.props.selectPlayerType(playerType)
  }

  selectDifficultyLevel(difficultyLevel: DifficultyLevel) {
    this.props.selectDifficultyLevel(difficultyLevel)
    this.setState({ redirectPath: '/game' })
  }

  getDifficultyLevelSubMenu() {
    return (
      <ResponsiveContext.Consumer >
        {size => (
          <Grid columns={size === 'small' ? ["full"] : ["1/4", "1/4", "1/4", "1/4"]}>
            <Button margin="small" size="large" color="neutral-1" label={this.getLocaleString('landing_difficulty_level_easy')} primary onClick={() => this.selectDifficultyLevel(DifficultyLevel.EASY)} />
            <Button margin="small" size="large" color="neutral-2" label={this.getLocaleString('landing_difficulty_level_medium')} primary onClick={() => this.selectDifficultyLevel(DifficultyLevel.MEDIUM)} />
            <Button margin="small" size="large" color="neutral-3" label={this.getLocaleString('landing_difficulty_level_hard')} primary onClick={() => this.selectDifficultyLevel(DifficultyLevel.HARD)} />
            <Button margin="small" size="large" color="neutral-4" label={this.getLocaleString('landing_difficulty_level_extreme')} primary onClick={() => this.selectDifficultyLevel(DifficultyLevel.EXTREME)} />
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  getPlayerTypeMenu() {
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

  getMainContent() {
    if (this.props.difficultyLevel != null) {
      return (<Redirect to="/game"/>)
    } else if (this.props.playerType != null) {
      return this.getDifficultyLevelSubMenu()
    } else {
      return this.getPlayerTypeMenu()
    }
  }

  getLocaleString(translationKey: string): String {
    return this.props.t(translationKey)
  }

  render() {
    if (this.state.redirectPath) {
      return (<Redirect to={this.state.redirectPath!} />)
    }
    if (this.props.playerType != null && this.props.difficultyLevel != null) {
      return (<Redirect to='/game' />)
    }
    return (
      <Box fill background="react">
        <Box flex align='center' justify='center'>
          <Heading margin="small">{this.getLocaleString('landing_app_title')}</Heading>
          <Text>{this.getLocaleString('landing_app_description')}</Text>
          <Text margin="small"></Text>
          {this.getMainContent()}
        </Box>
      </Box>
    )
  }
}

export default connector(withTranslation('landing')(LandingPage))