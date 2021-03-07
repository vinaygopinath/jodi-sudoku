import React from "react"
import { RootState } from "../../../../store/rootReducer"
import { connect, ConnectedProps } from "react-redux"
import { Box, Button, CheckBox, Clock, Menu, ResponsiveContext } from "grommet"
import "./sudoku-panel.scss"
import {
  changeValueEntryMode,
  clearGame,
  pauseSudokuClock,
  resumeSudokuClock,
  updateSudokuClock,
} from "../../../../store/game/game-actions"
import { WithTranslation, withTranslation } from "react-i18next"
import { ValueEntryMode } from "../../../../models/game/ValueEntryMode"
import Toast from "../toast/Toast"
import { ActionCreators as UndoActionCreators } from "redux-undo"
import CellValueDigit from "../cell-value-digit/CellValueDigit"
import { Undo, Menu as MenuIcon, New } from "grommet-icons"
import { PlayerActions } from "../../../../store/player/player-actions"
import ConfirmationDialog from "../confirmation-dialog/ConfirmationDialog"
import { Redirect } from "react-router-dom"

const mapState = (state: RootState) => ({
  isClockRunning: state.game.isClockRunning,
  isGameSolved: state.game.isSolved,
  gameTime: state.game.gameTime,
  valueEntryMode: state.game.valueEntryMode,
})
const mapDispatchToProps = {
  pauseSudokuClock: () => pauseSudokuClock(),
  resumeSudokuClock: () => resumeSudokuClock(),
  updateSudokuClock: (newTime: string) => updateSudokuClock(newTime),
  changeValueEntryMode: (valueEntryMode: ValueEntryMode) =>
    changeValueEntryMode(valueEntryMode),
  undoLastAction: () => UndoActionCreators.undo(),
  resetPlayer: () => PlayerActions.resetPlayer(),
  clearGame: () => clearGame(),
}
const connector = connect(mapState, mapDispatchToProps)
type SudokuPanelProps = ConnectedProps<typeof connector> & WithTranslation & {}

type SudokuPanelState = {
  initialGameTime: string | null
  redirectToLandingPage: boolean
  isToastVisible: boolean
  toastText: string
  isConfirmationDialogVisible: boolean
}

class SudokuPanel extends React.PureComponent<
  SudokuPanelProps,
  SudokuPanelState
> {
  state = {
    initialGameTime: null,
    redirectToLandingPage: false,
    isToastVisible: false,
    toastText: "",
    isConfirmationDialogVisible: false,
  }

  componentDidMount() {
    if (this.props.gameTime) {
      this.setState({
        initialGameTime: this.props.gameTime,
      })
    }
    document.addEventListener(
      "visibilitychange",
      this.onDocumentVisibilityChanged
    )
    this.onDocumentVisibilityChanged()
  }

  componentDidUpdate() {
    if (!this.state.initialGameTime) {
      this.setState({
        initialGameTime: this.props.gameTime,
      })
    }
  }

  onDocumentVisibilityChanged = () => {
    if (this.props.isGameSolved) {
      return
    }

    if (document.hidden) {
      this.props.pauseSudokuClock()
    } else {
      this.props.resumeSudokuClock()
    }
  }

  updateClockTime(time: string) {
    this.props.updateSudokuClock(time)
  }

  render() {
    if (this.state.redirectToLandingPage) {
      return <Redirect to="/" />
    }
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            className="sudoku-panel"
            direction={size === "small" ? "column-reverse" : "column"}
          >
            {this.state.initialGameTime && this.showClockWithMenu()}
            {this.showDigitButtons()}
            {this.state.isToastVisible && (
              <Toast label={this.state.toastText} />
            )}
            {this.showConfirmationDialog()}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  showClockWithMenu() {
    return (
      <Box direction="row" alignSelf="end">
        <Clock
          className="clock"
          type="digital"
          time={this.state.initialGameTime!!}
          size="large"
          onChange={(...args: any[]) => this.updateClockTime(args[0] as string)}
          run={!!this.state.initialGameTime && this.props.isClockRunning}
        />
        <Menu
          className="menu"
          label={<MenuIcon className="hamburger-icon" />}
          items={[
            {
              label: (
                <Box
                  style={{ marginTop: 0, marginBottom: 0 }}
                  direction="row"
                  alignSelf="start"
                  margin={{ top: "small", end: "medium", bottom: "large" }}
                  onClick={(event: React.MouseEvent) => {
                    this.onToggleValueEntryMode(
                      this.props.valueEntryMode === ValueEntryMode.CELL_FIRST
                    )
                  }}
                >
                  <CheckBox
                    label={this.getLocaleString(
                      "game_value_entry_mode_cell_first"
                    )}
                    toggle
                    checked={
                      this.props.valueEntryMode === ValueEntryMode.CELL_FIRST
                    }
                    onChange={(event) =>
                      this.onToggleValueEntryMode(event.target.checked)
                    }
                  />
                </Box>
              ),
            },
            {
              label: this.getLocaleString("game_menu_item_new_game"),
              gap: "medium",
              onClick: this.onNewGameMenuItemClick,
              icon: (
                <Box pad={{ start: "small" }} alignContent="center">
                  <New size="medium" />
                </Box>
              ),
            },
            // { label: 'Settings', icon: <SettingsOption />, gap: 'medium' },
          ]}
        ></Menu>
      </Box>
    )
  }

  showDigitButtons() {
    return (
      <Box>
        <Box direction="row" wrap={true} alignSelf="center">
          <CellValueDigit digit={1} />
          <CellValueDigit digit={2} />
          <CellValueDigit digit={3} />
          <CellValueDigit digit={4} />
          <CellValueDigit digit={5} />
        </Box>
        <Box
          className="digit-bottom-row"
          direction="row"
          wrap={true}
          alignSelf="center"
        >
          <CellValueDigit digit={6} />
          <CellValueDigit digit={7} />
          <CellValueDigit digit={8} />
          <CellValueDigit digit={9} />
          <Button
            className="undo-button"
            icon={<Undo color="#5f0f40" />}
            onClick={() => this.onClickUndo()}
          />
        </Box>
      </Box>
    )
  }

  showConfirmationDialog() {
    return (
      this.state.isConfirmationDialogVisible && (
        <ConfirmationDialog
          positiveButtonText={this.getLocaleString(
            "game_new_game_confirmation_dialog_positive_button_text"
          )}
          onPositiveButtonClick={this.onConfirmNewGameClick}
          neutralButtonText={this.getLocaleString(
            "game_new_game_confirmation_dialog_neutral_button_text"
          )}
          onNeutralButtonClick={this.closeGameInProgressDialog}
          title={this.getLocaleString(
            "game_new_game_confirmation_dialog_title"
          )}
          message={this.getLocaleString(
            "game_new_game_confirmation_dialog_message"
          )}
        />
      )
    )
  }

  toggleGameInProgressDialog(showDialog: boolean) {
    if (this.state.isConfirmationDialogVisible !== showDialog) {
      this.setState({
        isConfirmationDialogVisible: showDialog,
      })
    }
  }

  private closeGameInProgressDialog = () => {
    this.toggleGameInProgressDialog(false)
  }

  private onNewGameMenuItemClick = () => {
    this.toggleGameInProgressDialog(true)
  }

  private onConfirmNewGameClick = () => {
    this.toggleGameInProgressDialog(false)
    this.props.resetPlayer()
    this.props.clearGame()
    this.setState({
      initialGameTime: null,
      redirectToLandingPage: true,
    })
  }

  onClickUndo() {
    this.props.undoLastAction()
  }

  onToggleValueEntryMode(isChecked: boolean) {
    const newValueEntryMode: ValueEntryMode = isChecked
      ? ValueEntryMode.CELL_FIRST
      : ValueEntryMode.DIGIT_FIRST
    this.props.changeValueEntryMode(newValueEntryMode)
    this.showValueEntryModeToast(newValueEntryMode)
  }

  showValueEntryModeToast(newValueEntryMode: ValueEntryMode) {
    this.setState({
      isToastVisible: true,
      toastText: this.getLocaleString(
        newValueEntryMode === ValueEntryMode.CELL_FIRST
          ? "game_value_entry_mode_cell_first_toast"
          : "game_value_entry_mode_digit_first_toast"
      ),
    })
    setTimeout(() => {
      this.setState({
        isToastVisible: false,
      })
    }, 5000)
  }

  getLocaleString(translationKey: string): string {
    return this.props.t(translationKey)
  }
}

export default connector(withTranslation("game")(SudokuPanel))
