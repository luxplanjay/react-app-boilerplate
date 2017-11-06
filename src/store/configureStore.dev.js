/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

export const history = createHistory();

const middleware = [
  routerMiddleware(history),
  thunk,
];

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware),
);

export function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  );

  if (module.hot) {
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('@/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
