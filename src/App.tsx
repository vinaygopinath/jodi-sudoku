import React from "react";
import { Grommet } from "grommet";
import { Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import GamePage from "./pages/game/GamePage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import './i18n'

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
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback="Loading..">
          <Grommet theme={theme} full>
            <Route exact path="/" component={LandingPage} />
            <Route path="/game" component={GamePage} />
          </Grommet>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
