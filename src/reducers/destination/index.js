import * as ActionTypes from '../../actions/destination';
import {combineReducers} from 'redux';


const id = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
      return null;
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
      return action.response.id;
    default:
      return state;
  }
};

const country = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
      return [];
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
      return action.response.country;
    default:
      return state;
  }
};

const video = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
      return null;
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
      return {...action.response.video};
    default:
      return state;
  }
};


const isFetching = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DESTINATION_START:
      return true;
    case ActionTypes.FETCH_DESTINATION_SUCCESS:
    case ActionTypes.FETCH_DESTINATION_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  id,
  country,
  video,
  isFetching
});


export const getDestination = (state) => {
  if (state.country) {
    return {id: state.id, video: state.video, country: state.country};
  }
  return null;
}

export const getIsFetching = (state) => state.isFetching;
