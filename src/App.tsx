import React from 'react';
import { Grommet, Box } from 'grommet';
import { Route } from 'react-router-dom';
import Landing from './pages/landing/landing';

const theme = {
  global: {
    colors: {
      react: '#282c34'
    },
    font: {
      size: '18px',
      height: '20px',
      family: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
    },
  },
};

const App: React.FC = () => {
  return (
    <Grommet theme={theme} full>
      <Route path="/" component={Landing}></Route>
    </Grommet>
  );
}

export default App;
