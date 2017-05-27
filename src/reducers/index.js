import {combineReducers} from 'redux-immutable';
import entities, * as fromEntities from './entities/';
import destination, * as fromDestination from './destination/';

export default combineReducers({
  destination,
  entities
});

export const getAllDestinationsIsFetching = (state) => fromEntities.getAllDestinationsIsFetching(state.get('entities'));

export const getImages = (state, destinationId) => fromEntities.getImages(state.get('entities'), destinationId);
export const getImagesIsFetching = (state, destinationId) => fromEntities.getImagesIsFetching(state.get('entities'), destinationId);

export const getCountries = (state) => fromEntities.getCountries(state.get('entities'));
export const getCountriesIsFetching = (state) => fromEntities.getCountriesIsFetching(state.get('entities'));

export const getCities = (state) => fromEntities.getCities(state.get('entities'));
export const getCitiesIsFetching = (state) => fromEntities.getCitiesIsFetching(state.get('entities'));

export const getVideos = (state) => fromEntities.getVideos(state.get('entities'));
export const getVideosByCountry = (state) => fromEntities.getVideosByCountry(state.get('entities'));
export const getVideosIsFetching = (state) => fromEntities.getVideosIsFetching(state.get('entities'));

export const getDestination = (state) => fromDestination.getDestination(state.get('destination'));
export const getDestinationIsFetching = (state) => fromDestination.getIsFetching(state.get('destination'));
