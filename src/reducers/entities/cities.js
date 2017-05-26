import {combineReducers} from 'redux-immutable';
import * as ActionTypes from '../../actions/entities';
import {Map} from 'immutable';

const byId = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUNTRIES_SUCCESS:
      return Map(action.response.entities.cities);
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

export const getEntities = (state) => state.get('byId');
export const getIsFetching = (state) => state.get('isFetching');
