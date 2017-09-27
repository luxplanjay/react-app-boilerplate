import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default (
  <Switch>
    <Route
      exact
      path="/"
      component={() => <h1>HOME PAGE COMPONENT</h1>}
    />
    <Route render={() => <h1>404 COMPONENT</h1>} />
  </Switch>
);

