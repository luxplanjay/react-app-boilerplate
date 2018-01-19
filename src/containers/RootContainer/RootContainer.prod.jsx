import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from '@/components/App';

const RootContainer = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

RootContainer.propTypes = {
  history: PropTypes.shape().isRequired,
  store: PropTypes.shape().isRequired,
};

export default RootContainer;
