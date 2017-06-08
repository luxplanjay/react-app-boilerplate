import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import RootContainer from './rootContainer/rootContainer';

const render = Component => {
  ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(RootContainer);
module.hot ? module.hot.accept('./rootContainer/rootContainer', () => { render(RootContainer); }) : void 0;
