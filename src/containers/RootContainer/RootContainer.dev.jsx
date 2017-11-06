import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import App from '@/components/App';

const propTypes = {
  history: PropTypes.shape().isRequired,
  store: PropTypes.shape().isRequired,
};

const RootContainer = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
);

RootContainer.propTypes = propTypes;

export default RootContainer;
