import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

export const history = createHistory();

const middleware = [
  routerMiddleware(history),
  thunk,
];

const enhancer = applyMiddleware(...middleware);

export function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
