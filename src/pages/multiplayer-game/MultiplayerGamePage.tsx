import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { withTranslation, WithTranslation } from "react-i18next"
import { RootState } from "../../store/RootReducer"
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormExtendedEvent,
  FormField,
  Heading,
  Layer,
  Text,
  TextInput,
} from "grommet"
import {
  moveCellFocusByArrowKey,
  setValueOfActiveCell,
  clearCellValue,
} from "../../store/grid/GridActions"
import { CellValueRange } from "../../store/grid/GridTypes"
import { ArrowKey } from "../../utils/KeyboardUtils"
import { ActionCreators as UndoActionCreators } from "redux-undo"
import { generateSudokuPuzzle, clearGame } from "../../store/single-player-game/SinglePlayerGameActions"
import { PlayerActions } from "../../store/player/PlayerActions"

const mapState = (state: RootState) => ({
  difficultyLevel: state.multiplayerGame.difficultyLevel,
  onlinePlayer: state.player.onlinePlayer,
  initialised: state.singlePlayerGame.initialised,
  isGameSolved: state.singlePlayerGame.isSolved,
  gameDuration: state.singlePlayerGame.gameTime,
})

const mapDispatch = {
  moveCellFocusByArrowKey: (arrowKey: ArrowKey) =>
    moveCellFocusByArrowKey(arrowKey),
  setValueOfActiveCell: (value: CellValueRange) => setValueOfActiveCell(value),
  clearCellValue: () => clearCellValue(),
  generateSudokuPuzzle: () => generateSudokuPuzzle(),
  resetPlayer: () => PlayerActions.resetPlayer(),
  clearGame: () => clearGame(),
  undo: () => UndoActionCreators.undo(),
  redo: () => UndoActionCreators.redo(),
}

const connector = connect(mapState, mapDispatch)

type MultiplayerGameProps = ConnectedProps<typeof connector> & WithTranslation & {
  userRegistrationRememberUser: boolean
}

class MultiplayerGamePage extends React.Component<MultiplayerGameProps> {

  componentDidMount() {
    if (!this.props.difficultyLevel) {
      return
    }
  }

  shouldComponentUpdate(nextProps: MultiplayerGameProps, nextState: RootState) {
    return (
      this.props.isGameSolved !== nextProps.isGameSolved ||
      this.props.difficultyLevel !== nextProps.difficultyLevel ||
      this.props.initialised !== nextProps.initialised
    )
  }

  render() {
    if (!this.props.onlinePlayer) {
      return <div>{this.showUserRegistrationDialog()}</div>
    }
  }

  showUserRegistrationDialog() {
    return (
      <Layer
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Heading level={2}>
          {this.getLocaleString(
            "player:player_registration_dialog_title"
          )}
        </Heading>
        <Text margin={{ bottom: "medium" }}>
          {this.getLocaleString(
            "player:player_registration_dialog_message"
          )}
        </Text>

        <Form
          onSubmit={(event: FormExtendedEvent<unknown, Element>) =>
            this.onUserRegistrationSubmit(event)
          }
        >
          <FormField
            name="username"
            htmlFor="user-registration-username"
            label={this.getLocaleString("player:player_username")}
          >
            <TextInput
              id="user-registration-username"
              name="username"
              placeholder={this.getLocaleString(
                "player:player_registration_dialog_username_placeholder"
              )}
              value={this.props.onlinePlayer?.username}
            />
            </FormField>
            <FormField
              name="remember-user"
              htmlFor="user-registration-remember"
              label={this.getLocaleString("player:player_registration_remember_user")}
            >
              <CheckBox
                id="user-registration-remember-user"
                name="remember-user"
                onChange={(event) => event.target.checked = !event.target.checked}
                checked={this.props.userRegistrationRememberUser}
              />
            </FormField>
          <Box direction="row" justify="end" gap="medium">
            <Button
              name="negative"
              size="large"
              onClick={() => this.returnToLandingPage()}
            />
            <Button type="submit" name="positive" size="large" primary />
          </Box>
        </Form>
      </Layer>
    )
  }

  getLocaleString(translationKey: string, args: any = undefined): string {
    return this.props.t(translationKey, args)
  }

  onUserRegistrationSubmit(event: FormExtendedEvent<unknown, Element>) {
    const { username, rememberUser } = event.value as {
      username: string
      rememberUser: boolean
    }
    // TODO Invoke an action that triggers the network request
  }

  returnToLandingPage() {
    // TODO Clear state and return to landing page
  }
}

export default connector(withTranslation(["player", "shared"])(MultiplayerGamePage))