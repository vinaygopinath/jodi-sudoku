import { Button, Grid, Heading, Layer, ResponsiveContext, Text } from 'grommet';
import React from 'react';
import './confirmation-dialog.scss';

type ConfirmationDialogProps = {
  title: string,
  message: string,
  positiveButtonText?: string | null,
  onPositiveButtonClick?: () => void | null,
  negativeButtonText?: string | null,
  onNegativeButtonClick?: () => void | null,
  neutralButtonText?: string | null | null,
  onNeutralButtonClick?: () => void | null,
}

class ConfirmationDialog extends React.PureComponent<ConfirmationDialogProps> {

  constructor(props: ConfirmationDialogProps) {
    super(props)

    if (!this.areBothPropsSetOrNull(this.props.positiveButtonText, this.props.onPositiveButtonClick)) {
      throw new Error("Positive button or click listener was missing. To display a positive button, please set both properties");
    }

    if (!this.areBothPropsSetOrNull(this.props.negativeButtonText, this.props.onNegativeButtonClick)) {
      throw new Error("Negative button or click listener was missing. To display a negative button, please set both properties");
    }

    if (!this.areBothPropsSetOrNull(this.props.neutralButtonText, this.props.onNeutralButtonClick)) {
      throw new Error("Neutral button or click listener was missing. To display a neutral button, please set both properties")
    }
  }

  getButtonRowsForSize(size: string): string[] {
    switch (size) {
      case 'xsmall':
      case 'small':
      case 'medium':
        return ['auto', 'auto', 'auto']
      default: return ['auto']
    }
  }

  getButtonColumnsForSize(size: string): string[] {
    switch (size) {
      case 'xsmall':
      case 'small':
      case 'medium':
        return ['auto']
      default: return ['auto', 'auto', 'auto']
    }
  }

  // column, row
  getButtonAreasForSize(size: string): { name?: string, start?: number[], end?: number[] }[] {
    switch (size) {
      case 'xsmall':
      case 'small':
      case 'medium':
        return [
          {
            name: 'negative',
            start: [0, 0],
            end: [0, 0]
          },
          {
            name: 'neutral',
            start: [0, 1],
            end: [0, 1]
          },
          {
            name: 'positive',
            start: [0, 2],
            end: [0, 2]
          }
        ]
      default:
        return [
          {
            name: 'negative',
            start: [0, 0],
            end: [0, 0]
          },
          {
            name: 'neutral',
            start: [1, 0],
            end: [1, 0]
          },
          {
            name: 'positive',
            start: [2, 0],
            end: [2, 0]
          }
        ]
    }
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Layer className="layer">
            <Heading level={2}>{this.props.title}</Heading>
            <Text margin={{bottom: 'medium'}}>{this.props.message}</Text>
            {(this.props.positiveButtonText || this.props.negativeButtonText || !!this.props.neutralButtonText) && (
              <Grid alignContent="center" justifyContent="center" gap={{row: 'xsmall', column: 'medium'}} rows={this.getButtonRowsForSize(size)} columns={this.getButtonColumnsForSize(size)} areas={this.getButtonAreasForSize(size)}>
                {this.props.negativeButtonText && this.props.onNegativeButtonClick && <Button name="negative" label={this.props.negativeButtonText} size="large" onClick={this.props.onNegativeButtonClick} />}
                {this.props.neutralButtonText && this.props.onNeutralButtonClick && <Button name="neutral" label={this.props.neutralButtonText} size="large" onClick={this.props.onNeutralButtonClick} />}
                {this.props.positiveButtonText && this.props.onPositiveButtonClick && <Button name="positive" label={this.props.positiveButtonText} primary size="large" onClick={this.props.onPositiveButtonClick} />}
              </Grid>
            )
            }
          </Layer>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  areBothPropsSetOrNull(prop1: any, prop2: any): boolean {
    const isProp1Available = !!prop1
    const isProp2Available = !!prop2

    return isProp1Available === isProp2Available
  }
}

export default ConfirmationDialog