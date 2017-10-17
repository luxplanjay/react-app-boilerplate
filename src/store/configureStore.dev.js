/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

const middleware = [routerMiddleware(history), thunk];

export default function (initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('@/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
