import {combineReducers} from 'redux-immutable';
import * as ActionTypes from '../../actions/entities';
import {Map, List} from 'immutable';

const byId = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_SUCCESS: {
      const newState = action.response.result
        .filter(id => action.response.entities.videos[id].countries.length > 0)
        .reduce((accum, id) => accum.set(id, action.response.entities.videos[id]),
            Map().asMutable()).asImmutable();

      return state.merge(newState);
    }
    default:
      return state;
  }
}


const byCountry = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_SUCCESS: {
      const newState = action.response.result
        .reduce((accum, id) => {
         
          const countries = action.response.entities.videos[id].countries;
          if (countries.length) {
            for (let country of countries) {
              const list = accum.get(country, List()).asMutable();
              accum.set(country, list.push(id).asImmutable());
            }
          }
          return accum;
        }, Map().asMutable()).asImmutable();
      
      return state.mergeDeep(newState);
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

export const getEntities = (state) => state.get('byId');
export const getTotal = (state) => state.get('total');
export const getVideosByCountry = (state) => state.get('byCountry');
export const getIsFetching = (state) => state.get('isFetching');
