import {combineReducers} from 'redux';
import * as ActionTypes from '../../actions/entities';

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUNTRIES_SUCCESS:
      return {...action.response.entities.cities};
    default:
      return state;
  }
}

const isFetching = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUNTRIES_START:
      return true;
    case ActionTypes.FETCH_COUNTRIES_SUCCESS:
    case ActionTypes.FETCH_COUNTRIES_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  isFetching
});

export const getEntities = (state) => state.byId;
export const getIsFetching = (state) => state.isFetching;
