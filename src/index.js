import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import RootContainer from './components/rootContainer';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app-root')
  );
};

render(RootContainer);

module.hot ? module.hot.accept('./components/rootContainer', () => {
  render(RootContainer);
}) : void 0;
