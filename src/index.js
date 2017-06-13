import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import RootContainer from './components/RootContainer';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app-root')
  );
};

render(RootContainer);

module.hot ? module.hot.accept('./components/RootContainer', () => { render(RootContainer); }) : void 0;
