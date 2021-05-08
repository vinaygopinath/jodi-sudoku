import { Button } from 'grommet';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ValueEntryMode } from '../../../../models/game/ValueEntryMode';
import { setActiveDigit } from '../../../../store/single-player-game/SinglePlayerGameActions';
import { setValueOfActiveCell } from '../../../../store/grid/GridActions';
import { CellValueRange } from '../../../../store/grid/GridTypes';
import { RootState } from '../../../../store/RootReducer';
import classnames from 'classnames';
import './cell-value-digit.scss';

const mapState = (state: RootState) => ({
  activeDigit: state.singlePlayerGame.activeDigit,
  valueEntryMode: state.singlePlayerGame.valueEntryMode
})

const mapDispatch = {
  setActiveDigit: (number: CellValueRange) => setActiveDigit(number),
  setValueOfActiveCell: (number: CellValueRange) => setValueOfActiveCell(number)
}

const connector = connect(mapState, mapDispatch)
type CellValueDigitProps = ConnectedProps<typeof connector> & {
  digit: CellValueRange
}

class CellValueDigit extends React.PureComponent<CellValueDigitProps> {

  onDigitClick() {
    if (this.props.valueEntryMode === ValueEntryMode.CELL_FIRST) {
      this.props.setValueOfActiveCell(this.props.digit)
    } else {
      this.props.setActiveDigit(this.props.digit)
    }
  }

  render() {
    const isActive = this.props.digit === this.props.activeDigit
    const buttonClasses = classnames({
      'digit-button': true,
      active: isActive
    })
    return (
      <Button className={buttonClasses} size="small" label={this.props.digit} active={isActive} onClick={() => this.onDigitClick()} />
    )
  }
}

export default connector(CellValueDigit)