import {combineReducers} from 'redux';
import * as ActionTypes from '../../actions/entities';

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_SUCCESS: {
      const newState = action.response.result
        .filter(id => action.response.entities.videos[id].countries.length > 0)
        .reduce((accum, id) => {
          accum[id] = action.response.entities.videos[id];
          return accum;
        }, {});

      return {...state, ...newState};
    }
    default:
      return state;
  }
}


const byCountry = (state = {}, action) => {

  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_SUCCESS: {
      const newState = action.response.result
        .reduce((accum, id) => {
          const countries = action.response.entities.videos[id].countries;
          if (countries.length) {
            for (let country of countries) {
              accum[country] = accum[country] || [];
              accum[country].push(id);
            }
          }
          return accum;
        }, {});

      return Object.keys(state).reduce((accum, country) => {
        accum[country] = [...(state[country] || []), ...(accum[country] || [])];
        return accum;
      }, newState);
    }

    default:
      return state;
  }
}

const total = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_SUCCESS:
      return action.response.result.length + state;
    default:
      return state;
  }
}

const isFetching = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_START:
      return true;
    case ActionTypes.FETCH_VIDEOS_SUCCESS:
    case ActionTypes.FETCH_VIDEOS_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  byCountry,
  total,
  isFetching
});

export const getEntities = (state) => state.byId;
export const getTotal = (state) => state.total;
export const getVideosByCountry = (state) => state.byCountry;
export const getIsFetching = (state) => state.isFetching;
