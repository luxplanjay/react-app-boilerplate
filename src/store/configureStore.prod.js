import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

const middleware = [routerMiddleware(history), thunk];

export default function (initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}
