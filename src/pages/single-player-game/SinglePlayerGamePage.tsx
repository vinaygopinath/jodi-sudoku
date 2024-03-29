import React from "react"
import "./single-player-game-page.scss"
import { connect, ConnectedProps } from "react-redux"
import { withTranslation, WithTranslation } from "react-i18next"
import { RootState } from "../../store/RootReducer"
import {
  Box,
  Grid,
  Keyboard,
  ResponsiveContext,
} from "grommet"
import SudokuGrid from "./components/sudoku-grid/SudokuGrid"
import {
  ArrowKey,
  isArrowKey,
  getArrowKey,
  isCellValueKey,
  getCellValueKey,
  isDeleteOrBackspaceKey,
  isUndoKey,
  isRedoKey,
  isKeyToBeSilentlyConsumed,
} from "../../utils/KeyboardUtils"
import {
  moveCellFocusByArrowKey,
  setValueOfActiveCell,
  clearCellValue,
} from "../../store/grid/GridActions"
import { CellValueRange } from "../../store/grid/GridTypes"
import { ActionCreators as UndoActionCreators } from "redux-undo"
import { generateSudokuPuzzle, clearGame } from "../../store/single-player-game/SinglePlayerGameActions"
import { Redirect } from "react-router-dom"
import { PlayerActions } from "../../store/player/PlayerActions"
import ConfirmationDialog from "./components/confirmation-dialog/ConfirmationDialog"
import SudokuPanel from "./components/sudoku-panel/SudokuPanel"
import { DateTimeUtils } from "../../utils/DateTimeUtils"
import { SharedUtils } from "../../utils/SharedUtils"
import { Helmet } from "react-helmet"

const mapState = (state: RootState) => ({
  difficultyLevel: state.singlePlayerGame.difficultyLevel,
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

type GameProps = ConnectedProps<typeof connector> & WithTranslation & {
  userRegistrationRememberUser: boolean
}

class GamePage extends React.Component<GameProps, {}> {
  componentDidMount() {
    if (!this.props.difficultyLevel) {
      return
    }

    if (!this.props.initialised) {
      this.props.generateSudokuPuzzle()
    }
  }

  shouldComponentUpdate(nextProps: GameProps, nextState: RootState) {
    return (
      this.props.isGameSolved !== nextProps.isGameSolved ||
      this.props.difficultyLevel !== nextProps.difficultyLevel ||
      this.props.initialised !== nextProps.initialised
    )
  }

  getLayoutRowsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["2/3", "1/3"]
      default:
        return ["full"]
    }
  }

  getLayoutColumnsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["full"]
      default:
        return ["3/4", "1/4"]
    }
  }

  getUserRegistrationDialogButtonRowsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["auto", "auto"]
      default:
        return ["auto"]
    }
  }

  getUserRegistrationDialogButtonColumnsForSize(size: string): string[] {
    switch (size) {
      case "xsmall":
      case "small":
        return ["auto"]
      default:
        return ["auto", "auto"]
    }
  }

  // column, row
  getUserRegistrationDialogButtonAreasForSize(
    size: string
  ): { name?: string; start?: number[]; end?: number[] }[] {
    switch (size) {
      case "xsmall":
      case "small":
      case "medium":
        return [
          {
            name: "negative",
            start: [0, 0],
            end: [0, 0],
          },
          {
            name: "positive",
            start: [0, 1],
            end: [0, 1],
          },
        ]
      default:
        return [
          {
            name: "negative",
            start: [0, 0],
            end: [0, 0],
          },
          {
            name: "positive",
            start: [1, 0],
            end: [1, 0],
          },
        ]
    }
  }

  getLayoutGridAreasForSize(
    size: string
  ): { name?: string; start?: number[]; end?: number[] }[] {
    switch (size) {
      case "xsmall":
      case "small":
        return [
          /**
           * Small screens use a two-row approach.
           * The first row takes up two-thirds of the height (and full width) for the game area
           * The second row takes up a third  of the height (and full width) for the options/buttons area
           */
          { name: "game", start: [0, 0], end: [0, 0] },
          { name: "options", start: [0, 1], end: [0, 1] },
        ]
      default:
        return [
          /**
           * Medium, large and xlarge screens use a two-column approach.
           * The first row takes up 75% of the width (and full height) for the game area
           * The second row takes up 25% of the width (and full height) for the options/buttons area
           */
          { name: "game", start: [0, 0], end: [0, 0] },
          { name: "options", start: [1, 0], end: [1, 0] },
        ]
    }
  }

  handleKeyboardEvent(event: React.KeyboardEvent<HTMLElement>) {
    if (this.props.isGameSolved) {
      // Game is solved, don't handle any key events
      return
    }
    const isArrow = isArrowKey(event)
    const isCellValue = isCellValueKey(event)
    const isDeleteOrBackspace = isDeleteOrBackspaceKey(event)
    const isUndo = isUndoKey(event)
    const isRedo = isRedoKey(event)
    if (
      !isArrow &&
      !isCellValue &&
      !isDeleteOrBackspace &&
      !isUndo &&
      !isRedo
    ) {
      if (isKeyToBeSilentlyConsumed(event)) {
        event.preventDefault()
      }
      return
    }

    event.preventDefault()
    if (isCellValue) {
      const cellValueKey = getCellValueKey(event)
      this.props.setValueOfActiveCell(cellValueKey)
    } else if (isArrow) {
      const arrowKey = getArrowKey(event)
      this.props.moveCellFocusByArrowKey(arrowKey)
    } else if (isDeleteOrBackspace) {
      this.props.clearCellValue()
    } else if (isUndo) {
      this.props.undo()
    } else if (isRedo) {
      this.props.redo()
    }
  }

  render() {
    if (this.props.difficultyLevel == null) {
      return <Redirect to="/"></Redirect>
    }

    // if (
    //   this.props.playerType === PlayerType.TWO_PLAYER &&
    //   !this.props.onlinePlayer
    // ) {
    //   return <div>{this.showUserRegistrationDialog()}</div>
    // }

    return (
      <Keyboard
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
          this.handleKeyboardEvent(event)
        }}
        target="document"
      >
        <Helmet>
          <title>{this.getPageTitle()}</title>
          <meta
            name="description"
            content={this.getLocaleString("shared_page_description")}
          />
        </Helmet>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Grid
              fill
              rows={this.getLayoutRowsForSize(size)}
              columns={this.getLayoutColumnsForSize(size)}
              areas={this.getLayoutGridAreasForSize(size)}
            >
              <Box id="grid-section">
                <SudokuGrid />
              </Box>
              <SudokuPanel />
            </Grid>
          )}
        </ResponsiveContext.Consumer>
        {this.showGameSolvedDialog()}
      </Keyboard>
    )
  }

  showGameSolvedDialog() {
    return (
      this.props.isGameSolved && (
        <ConfirmationDialog
          positiveButtonText={this.getLocaleString(
            "game_complete_dialog_positive_button_text"
          )}
          onPositiveButtonClick={this.onConfirmNewGameClick}
          title={this.getLocaleString("game_complete_dialog_title")}
          message={this.getLocaleString("game_complete_dialog_message", {
            time: DateTimeUtils.getHumanReadableTime(this.props.gameDuration),
          })}
        />
      )
    )
  }

  getLocaleString(translationKey: string, args: any = undefined): string {
    return this.props.t(translationKey, args)
  }

  getPageTitle(): string {
    const difficultyLevelString = this.getLocaleString(
      SharedUtils.getDifficultyLevelResource(this.props.difficultyLevel)
    )
    const playerTypeString = this.getLocaleString(
      'shared:shared_player_type_single'
    )
    const appTitleString = this.getLocaleString(
      SharedUtils.getAppTitleResource()
    )
    const puzzleString = this.getLocaleString(SharedUtils.getPuzzleResource())
    return `${appTitleString} - ${difficultyLevelString} ${puzzleString} | ${playerTypeString}`
  }

  private onConfirmNewGameClick = () => {
    this.props.resetPlayer()
    this.props.clearGame()
    this.setState({
      initialGameTime: null,
      redirectToLandingPage: true,
    })
  }
}

export default connector(withTranslation(["game", "shared"])(GamePage))
