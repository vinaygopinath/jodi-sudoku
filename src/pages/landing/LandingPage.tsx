import React from "react"
import {
  Heading,
  Box,
  Button,
  Text,
  ResponsiveContext,
  Grid,
  Form,
  FormField,
  TextInput,
  FormExtendedEvent,
  Anchor,
} from "grommet"
import { Copy } from "grommet-icons"
import { RootState } from "../../store/RootReducer"
import {
  createRoom,
  selectDifficultyLevel as selectMultiplayerDifficultyLevel,
  selectGameType,
} from "../../store/multiplayer-game/MultiplayerGameActions"
import { selectDifficultyLevel as selectSinglePlayerDifficultyLevel } from "../../store/single-player-game/SinglePlayerGameActions"
import { connect, ConnectedProps } from "react-redux"
import { withTranslation, WithTranslation } from "react-i18next"
import { DifficultyLevel } from "../../models/player/DifficultyLevel"
import { Redirect } from "react-router-dom"
import { Helmet } from "react-helmet"
import { SharedUtils } from "../../utils/SharedUtils"
import { PlayerType } from "../../models/player/PlayerType"
import { MultiplayerGameType } from "../../models/player/MultiplayerGameType"

const mapState = (state: RootState) => ({
  singlePlayerDifficultyLevel: state.singlePlayerGame.difficultyLevel,
  multiplayerDifficultyLevel: state.multiplayerGame.difficultyLevel,
  multiplayerGameType: state.multiplayerGame.gameType,
  room: state.multiplayerGame.room,
})

const mapDispatch = {
  selectMultiplayerDifficultyLevel: (difficultyLevel: DifficultyLevel) =>
    selectMultiplayerDifficultyLevel(difficultyLevel),
  selectSinglePlayerDifficultyLevel: (difficultyLevel: DifficultyLevel) =>
    selectSinglePlayerDifficultyLevel(difficultyLevel),
  selectMultiplayerGameType: (gameType: MultiplayerGameType) =>
    selectGameType(gameType),
  createRoom: (name: string, link: string, description: string | null) => createRoom(name, link, description)
}

interface RoomCreationForm {
  name?: string,
  link?: string,
  description?: string
}

const connector = connect(mapState, mapDispatch)

type LandingProps = ConnectedProps<typeof connector> & WithTranslation

type LandingState = {
  redirectPath: string | null
  playerType: PlayerType | null
  roomLink: string | null
  roomLinkValidation: string | null
  roomNameValidation: string | null
}

class LandingPage extends React.Component<LandingProps, LandingState> {
  state = {
    redirectPath: null,
    playerType: null,
    roomLink: null,
    roomLinkValidation: null,
    roomNameValidation: null,
  }

  selectPlayerType(playerType: PlayerType) {
    this.setState({
      playerType: playerType,
    })
  }

  selectDifficultyLevel(difficultyLevel: DifficultyLevel) {
    if (this.state.playerType === PlayerType.SINGLE_PLAYER) {
      this.props.selectSinglePlayerDifficultyLevel(difficultyLevel)
      this.setState({ redirectPath: "/game" })
    } else {
      this.props.selectMultiplayerDifficultyLevel(difficultyLevel)
      // TODO: When other game types are supported, show a picker
      this.props.selectMultiplayerGameType(MultiplayerGameType.COOPERATIVE)
    }
  }

  getDifficultyLevelSubMenu() {
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Grid columns={size === "small" ? ["full"] : ["auto"]}>
            <Button
              margin="small"
              size="large"
              color="neutral-1"
              label={this.getLocaleString(
                SharedUtils.getDifficultyLevelResource(DifficultyLevel.EASY)
              )}
              primary
              onClick={() => this.selectDifficultyLevel(DifficultyLevel.EASY)}
            />
            <Button
              margin="small"
              size="large"
              color="neutral-2"
              label={this.getLocaleString(
                SharedUtils.getDifficultyLevelResource(DifficultyLevel.MEDIUM)
              )}
              primary
              onClick={() => this.selectDifficultyLevel(DifficultyLevel.MEDIUM)}
            />
            <Button
              margin="small"
              size="large"
              color="neutral-3"
              label={this.getLocaleString(
                SharedUtils.getDifficultyLevelResource(DifficultyLevel.HARD)
              )}
              primary
              onClick={() => this.selectDifficultyLevel(DifficultyLevel.HARD)}
            />
            <Button
              margin="small"
              size="large"
              color="neutral-4"
              label={this.getLocaleString(
                SharedUtils.getDifficultyLevelResource(DifficultyLevel.EXTREME)
              )}
              primary
              onClick={() =>
                this.selectDifficultyLevel(DifficultyLevel.EXTREME)
              }
            />
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }

  getPlayerTypeMenu() {
    return (
      <Grid columns={["full"]}>
        <Button
          margin="small"
          size="large"
          color="neutral-3"
          label={this.getLocaleString("landing_player_type_single")}
          primary
          onClick={() => this.selectPlayerType(PlayerType.SINGLE_PLAYER)}
        />
        <Button
          margin="small"
          size="large"
          color="neutral-4"
          label={this.getLocaleString("landing_player_type_two")}
          primary
          onClick={() => this.selectPlayerType(PlayerType.MULTIPLAYER)}
        />
      </Grid>
    )
  }

  validateRoomCreationForm(formData: RoomCreationForm): boolean {
    var roomLinkValidation = null
    var roomNameValidation = null
    if (!formData.name) {
      roomNameValidation = this.getLocaleString('room:room_name_validation_required')
    }
    if (!formData.link) {
      roomLinkValidation = this.getLocaleString('room:room_link_validation_required')
    }
    this.setState({
      roomLinkValidation: roomLinkValidation,
      roomNameValidation: roomNameValidation
    })

    const isFormValid = !roomNameValidation && !roomLinkValidation

    return isFormValid
  }

  onRoomCreationSubmit(event: FormExtendedEvent<unknown, Element>) {
    const formData = event.value as RoomCreationForm
    const isFormValid = this.validateRoomCreationForm(formData)
    if (!isFormValid) {
      return
    }

    const { name, link, description } = formData
    if (name != null && link != null && description) {
      this.props.createRoom(name, link, description)
    }
  }

  updateRoomLinkBasedOnName(event: React.ChangeEvent<HTMLInputElement>) {
    const roomName = event.target.value
    const link = roomName.toLocaleLowerCase().replaceAll(" ", "-")
    this.setState({
      roomLink: link,
    })
  }

  setRoomLink(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      roomLink: event.target.value,
    })
  }

  copyRoomUrl() {
    navigator.clipboard.writeText(
      `https://jodisudoku.app/${this.state.roomLink}`
    )
  }

  showRoomCreationSection() {
    return (
      <Grid columns={["full"]}>
        <Heading level={2}>
          {this.getLocaleString("room:room_introduction_title")}
        </Heading>
        {/* <Text margin={{ bottom: "medium" }}>
          {this.getLocaleString(
            "game_multiplayer_user_registration_dialog_message"
          )}
        </Text> */}

        <Form
          onSubmit={(event: FormExtendedEvent<unknown, Element>) =>
            this.onRoomCreationSubmit(event)
          }
        >
          <FormField
            name="name"
            htmlFor="room-creation-name"
            error={this.state.roomNameValidation}
            label={this.getLocaleString("room:room_name")}
          >
            <TextInput
              id="room-creation-name"
              name="name"
              onChange={(event) => this.updateRoomLinkBasedOnName(event)}
              placeholder={this.getLocaleString("room:room_name_placeholder")}
            />
          </FormField>
          <FormField
            name="link"
            htmlFor="room-creation-link"
            error={this.state.roomLinkValidation}
            label={this.getLocaleString("room:room_link")}
          >
            <TextInput
              id="room-creation-link"
              value={this.state.roomLink || ""}
              onChange={(event) => this.setRoomLink(event)}
              name="link"
            />
          </FormField>
          {this.state.roomLink && (
            <Text size="small" margin={{ start: "small" }}>
              {this.getLocaleString("room:room_full_link_prefix")}
              <Anchor
                margin={{ end: "small" }}
                id="room-full-url"
                href={`https://jodisudoku.app/${this.state.roomLink}`}
              >
                jodisudoku.app/{this.state.roomLink}
              </Anchor>
              <Copy
                cursor="pointer"
                size="small"
                onClick={(event) => this.copyRoomUrl()}
              ></Copy>
            </Text>
          )}
          <FormField
            margin={{ top: "small" }}
            name="description"
            htmlFor="room-creation-description"
            label={this.getLocaleString("room:room_description")}
          >
            <TextInput
              id="room-creation-description"
              name="description"
              placeholder={this.getLocaleString(
                "room:room_description_placeholder"
              )}
            />
          </FormField>
          <Box direction="row" justify="end" gap="medium">
            {/* <Button
              name="negative"
              size="large"
              label={this.getLocaleString("room_back_button")}
              onClick={() => this.returnToLandingPage()}
            /> */}
            <Button
              margin={{top: 'medium'}}
              type="submit"
              name="positive"
              size="large"
              primary
              label={this.getLocaleString("room:room_create_button")}
            />
          </Box>
        </Form>
      </Grid>
    )
  }

  clearMultiplayerGameTypeSelection() {}

  getMainContent() {
    if (!this.state.playerType) {
      return this.getPlayerTypeMenu()
    } else if (
      !this.props.singlePlayerDifficultyLevel &&
      !this.props.multiplayerDifficultyLevel
    ) {
      return this.getDifficultyLevelSubMenu()
    }
    // else if (this.props.multiplayerDifficultyLevel && !this.props.multiplayerGameType) {
    //   // show multiplayer game type selector
    // }
    else if (this.props.multiplayerDifficultyLevel && !this.props.room) {
      return this.showRoomCreationSection()
    }
  }

  getLocaleString(translationKey: string, args: any = undefined): string {
    return this.props.t(translationKey, args)
  }

  render() {
    if (this.state.redirectPath) {
      return <Redirect to={this.state.redirectPath!} />
    }
    if (this.props.singlePlayerDifficultyLevel != null) {
      return <Redirect to="/game" />
    }
    if (
      this.props.multiplayerDifficultyLevel != null &&
      this.props.room != null
    ) {
      return <Redirect to={`/${this.props.room.link}`} />
    }

    return (
      <Box fill background="react">
        <Box flex align="center" justify="center">
          <Helmet>
            <title>{this.getLocaleString("landing_page_title")}</title>
            <meta
              name="description"
              content={this.getLocaleString("landing_page_description")}
            />
          </Helmet>
          <Heading margin="small">
            {this.getLocaleString("landing_app_title")}
          </Heading>
          <Text>{this.getLocaleString("landing_app_description")}</Text>
          <Text margin="small"></Text>
          {this.getMainContent()}
        </Box>
      </Box>
    )
  }
}

export default connector(
  withTranslation(["landing", "shared", "room"])(LandingPage)
)
