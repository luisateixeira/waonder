
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import api from './middleware/api';

const configureStore = () => {
  const logger = createLogger();
  const enhacers = [applyMiddleware(thunk, api, logger)];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhacers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    reducer,
    compose(...enhacers)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}

export default configureStore;
