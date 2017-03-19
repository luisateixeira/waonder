import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers'
import thunk from 'redux-thunk';
import api from './middleware/api';

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk, api)
  );
}

export default configureStore;
