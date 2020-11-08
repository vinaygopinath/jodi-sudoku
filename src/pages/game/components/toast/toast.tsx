import React from 'react';
import { Box, Layer, Text } from "grommet"

type ToastProps = {
  label: string
}

class Toast extends React.PureComponent<ToastProps> {

  render() {
    return (
      <Layer
        position="bottom-right"
        modal={false}
        margin={{ vertical: 'medium', horizontal: 'small' }}
        responsive={false}
        plain
      >
        <Box
          align="center"
          direction="row"
          gap="small"
          justify="between"
          round="xsmall"
          elevation="medium"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          background="dark-3"
        >
          <Box align="center" direction="row" gap="xsmall">
            <Text>{this.props.label}</Text>
          </Box>
        </Box>
      </Layer>
    )
  }
}

export default Toast