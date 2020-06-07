import React from 'react';
import { Main, Heading, Box, Button, Text, Grommet, ResponsiveContext, Grid } from "grommet"
import { Notification } from 'grommet-icons'

type LandingProps = {

}
type LandingState = {

}

class AppBar extends React.Component {
  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: 1 }}
        {...this.props}
      />
    )
  }
}

export class Landing extends React.Component<LandingProps, LandingState> {
  state: LandingState = {

  }
  render() {
    return (
      <Box fill background="react">
        <Box flex align='center' justify='center'>
          <Heading margin="small">Jodi Sudoku</Heading>
          <Text>Play Sudoku with others</Text>
          <Text margin="small"></Text>
            <ResponsiveContext.Consumer>
              {size => (
                <Grid columns={size === 'small' ? ["full"] : ["1/2", "1/2"]}>
                  <Button margin="small" size="large" color="neutral-3" label="Single Player" primary />
                  <Button margin="small" size="large" color="neutral-4" label="Two Player" primary />
                </Grid>
              )}
            </ResponsiveContext.Consumer>
        </Box>
      </Box>
    )
  }
}