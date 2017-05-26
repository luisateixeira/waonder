import * as ActionTypes from '../../actions/entities';
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';

const byDestinationId = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.FETCH_IMAGES_SUCCESS:
      return state.set(action.actionID, action.response);
    default:
      return state;
  }
}

const isFetching = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.FETCH_IMAGES_START:
      return state.set(action.actionID, true);
    case ActionTypes.FETCH_IMAGES_FAILURE:
    case ActionTypes.FETCH_IMAGES_SUCCESS:
      return state.set(action.actionID, false);
    default:
      return state;
  }
}

export default combineReducers({
  byDestinationId,
  isFetching
});

export const getEntities = (state, destinationId) =>
  state.getIn(['byDestinationId', destinationId]);

export const getIsFetching = (state, destinationId) =>
  state.getIn(['isFetching', destinationId]);
