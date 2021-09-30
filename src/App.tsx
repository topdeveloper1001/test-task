import React from 'react';
import AppState from './context/background/AppState';
import SendContainer from './containers/SendContainer';

const App = () => {
  return (
    <AppState>
      <SendContainer />
    </AppState>
  );
};

export default App;
