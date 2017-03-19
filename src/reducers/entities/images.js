import * as ActionTypes from '../../actions/entities';
import {combineReducers} from 'redux';

const byDestinationId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_IMAGES_SUCCESS:
      return {...state, [action.actionID]: action.response};
    default:
      return state;
  }
}

const isFetching = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_IMAGES_START:
      return {...state, [action.actionID]: true};
    case ActionTypes.FETCH_IMAGES_FAILURE:
    case ActionTypes.FETCH_IMAGES_SUCCESS:
      return {...state, [action.actionID]: false};
    default:
      return state;
  }
}

export default combineReducers({
  byDestinationId,
  isFetching
});

export const getEntities = (state, destinationId) =>
  state.byDestinationId[destinationId];

export const getIsFetching = (state, destinationId) =>
  state.isFetching[destinationId];
