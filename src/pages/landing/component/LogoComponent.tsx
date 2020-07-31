
import { Main, Heading, Box, Button, Text, Grommet, ResponsiveContext, Grid } from "grommet"
import React from "react"

export class LogoComponent extends React.Component<{}, {}> {

  render() {
    return (
      <Box fill background="react">
        <Box flex align='center' justify='center'>
          <Heading margin="small">Jodi Sudoku</Heading>
          <Text>Play Sudoku with others</Text>
          <Text margin="small"></Text>
          {this.props.children}
        </Box>
      </Box>
    )
  }
}