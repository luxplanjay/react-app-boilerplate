import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" render={() => <h1>Homepage</h1>} />
      <Route render={() => <h1>404 COMPONENT</h1>} />
    </Switch>
  </Fragment>
);

export default App;
