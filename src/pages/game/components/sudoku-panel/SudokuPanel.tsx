import React from 'react';
import { RootState } from "../../../../store/rootReducer"
import { connect, ConnectedProps } from 'react-redux';
import { Box, Button, CheckBox, Clock, Menu } from 'grommet';
import './sudoku-panel.scss';
import { changeValueEntryMode, pauseSudokuClock, resumeSudokuClock, updateSudokuClock } from '../../../../store/game/game-actions';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ValueEntryMode } from '../../../../models/game/ValueEntryMode';
import Toast from '../toast/Toast';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import CellValueDigit from '../cell-value-digit/CellValueDigit';
import { Undo, Menu as MenuIcon } from 'grommet-icons';

const mapState = (state: RootState) => ({
  isClockRunning: state.game.isClockRunning,
  gameTime: state.game.gameTime,
  valueEntryMode: state.game.valueEntryMode
})
const mapDispatchToProps = {
  pauseSudokuClock: () => pauseSudokuClock(),
  resumeSudokuClock: () => resumeSudokuClock(),
  updateSudokuClock: (newTime: string) => updateSudokuClock(newTime),
  changeValueEntryMode: (valueEntryMode: ValueEntryMode) => changeValueEntryMode(valueEntryMode),
  undoLastAction: () => UndoActionCreators.undo()
}
const connector = connect(mapState, mapDispatchToProps)
type SudokuPanelProps = ConnectedProps<typeof connector> & WithTranslation & {

}

type SudokuPanelState = {
  initialGameTime: string | null,
  isToastVisible: boolean,
  toastText: string
}

class SudokuPanel extends React.PureComponent<SudokuPanelProps, SudokuPanelState> {

  state = {
    initialGameTime: null,
    isToastVisible: false,
    toastText: ""
  }

  componentDidMount() {
    if (this.props.gameTime) {
      this.setState({
        initialGameTime: this.props.gameTime
      })
    }
    document.addEventListener('visibilitychange', this.onDocumentVisibilityChanged)
    this.onDocumentVisibilityChanged()
  }

  componentDidUpdate() {
    if (!this.state.initialGameTime) {
      this.setState({
        initialGameTime: this.props.gameTime
      })
    }
  }

  onDocumentVisibilityChanged = () => {
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
    return (
      <Box className="sudoku-panel">
        {this.state.initialGameTime && this.showClock()}
        {this.showMenu()}
        {this.showDigitButtons()}
        {this.state.isToastVisible && <Toast label={this.state.toastText} />}
      </Box>
    )
  }

  showMenu() {
    return (
      <Box align="end">
        <Menu
          justifyContent="center"
          label={<MenuIcon />}
          items={[
            {
              label: (
                <Box direction="row" alignSelf="center" margin={{ top: 'small', end: 'medium', bottom: 'large' }}>
                  <CheckBox label={this.getLocaleString('game_value_entry_mode_cell_first')} toggle checked={this.props.valueEntryMode === ValueEntryMode.CELL_FIRST} onChange={(event) => this.onToggleValueEntryMode(event.target.checked)} />
                </Box>
              )
            },
            // { label: 'Settings', icon: <SettingsOption />, gap: 'medium' },
          ]}
        >

        </Menu>
      </Box>
    )
  }

  showClock() {
    return (
      <Clock className="clock" type="digital" time={this.state.initialGameTime!!} size="large" alignSelf="center" onChange={(...args: any[]) => this.updateClockTime(args[0] as string)} run={!!this.state.initialGameTime && this.props.isClockRunning} />
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
        <Box direction="row" wrap={true} alignSelf="center">
          <CellValueDigit digit={6} />
          <CellValueDigit digit={7} />
          <CellValueDigit digit={8} />
          <CellValueDigit digit={9} />
          <Button className="undo-button" icon={<Undo color="#5f0f40" />} onClick={() => this.onClickUndo()} />
        </Box>
      </Box>
    )
  }

  onClickUndo() {
    this.props.undoLastAction()
  }

  onToggleValueEntryMode(isChecked: boolean) {
    const newValueEntryMode: ValueEntryMode = isChecked ? ValueEntryMode.CELL_FIRST : ValueEntryMode.DIGIT_FIRST
    this.props.changeValueEntryMode(newValueEntryMode)
    this.showValueEntryModeToast(newValueEntryMode)
  }

  showValueEntryModeToast(newValueEntryMode: ValueEntryMode) {
    this.setState({
      isToastVisible: true,
      toastText: this.getLocaleString(newValueEntryMode === ValueEntryMode.CELL_FIRST ? 'game_value_entry_mode_cell_first_toast' : 'game_value_entry_mode_digit_first_toast')
    })
    setTimeout(() => {
      this.setState({
        isToastVisible: false
      })
    }, 5000)
  }

  getLocaleString(translationKey: string): string {
    return this.props.t(translationKey)
  }
}

export default connector(withTranslation('game')(SudokuPanel))