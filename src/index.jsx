/* eslint-disable global-require */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from './store';
import RootContainer from './containers/RootContainer';

const store = configureStore();

render(
  <AppContainer>
    <RootContainer store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    const NewRoot = require('./containers/RootContainer').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
