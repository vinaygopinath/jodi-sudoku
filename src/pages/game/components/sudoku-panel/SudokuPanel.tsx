import React from 'react';
import { RootState } from "../../../../store/rootReducer"
import { connect, ConnectedProps } from 'react-redux';
import { Box, Clock } from 'grommet';
import { Dispatch, AnyAction } from 'redux';
import './sudoku-panel.scss';
import { pauseSudokuClock, resumeSudokuClock, updateSudokuClock } from '../../../../store/game/game-actions';

const mapState = (state: RootState) => ({
  isClockRunning: state.game.isClockRunning,
  gameTime: state.game.gameTime
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  pauseSudokuClock: () => { dispatch(pauseSudokuClock()) },
  resumeSudokuClock: () => { dispatch(resumeSudokuClock()) },
  updateSudokuClock: (newTime: string) => { dispatch(updateSudokuClock(newTime)) }

})
const connector = connect(mapState, mapDispatchToProps)
type SudokuPanelProps = ConnectedProps<typeof connector> & {

}

type SudokuPanelState = {
  initialGameTime: string | null
}

class SudokuPanel extends React.PureComponent<SudokuPanelProps, SudokuPanelState> {

  state = {
    initialGameTime: null
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
      </Box>
    )
  }

  showClock() {
    return (
      <Clock className="clock" type="digital" time={this.state.initialGameTime!!} size="large" alignSelf="center" onChange={(...args: any[]) => this.updateClockTime(args[0] as string)} run={!!this.state.initialGameTime && this.props.isClockRunning} />
    )
  }
}

export default connector(SudokuPanel)