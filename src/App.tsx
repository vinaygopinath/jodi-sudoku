import React from "react"
import { Grommet } from "grommet"
import { Route } from "react-router-dom"
import LandingPage from "./pages/landing/LandingPage"
import SinglePlayerGamePage from "./pages/single-player-game/SinglePlayerGamePage"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/Store"

import "./i18n"
import MultiplayerGamePage from "./pages/multiplayer-game/MultiplayerGamePage"

const theme = {
  global: {
    colors: {
      react: "#282c34",
    },
    font: {
      size: "18px",
      height: "20px",
      family:
        "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback="Loading..">
          <Grommet theme={theme} full>
            <Route exact path="/" component={LandingPage} />
            <Route path="/game" component={SinglePlayerGamePage} />
            <Route path="/:roomName" component={MultiplayerGamePage} />
          </Grommet>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  )
}

export default App
