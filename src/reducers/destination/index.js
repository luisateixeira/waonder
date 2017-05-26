import * as ActionTypes from '../../actions/destination';
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';

const id = (action) => action.response.id;
const country = (action) => Map(action.response.country);
const video = (action) => Map(action.response.video);

const destination = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
    case ActionTypes.RESET_DESTINATION:
      return null;
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
      return Map({
          id: id(action),
          video: video(action),
          country: country(action)
        }
      );
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
      return true;
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
    case ActionTypes.RESET_DESTINATION:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  destination,
  isFetching
});

export const getDestination = (state) => state.get('destination');
export const getIsFetching = (state) => state.get('isFetching');
