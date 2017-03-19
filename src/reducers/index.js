import {combineReducers} from 'redux';
import entities, * as fromEntities from './entities/';
import destination, * as fromDestination from './destination/';

export default combineReducers({
  destination,
  entities
});

export const getAllDestinationsIsFetching = (state) => fromEntities.getAllDestinationsIsFetching(state.entities);

export const getImages = (state, destinationId) => fromEntities.getImages(state.entities, destinationId);
export const getImagesIsFetching = (state, destinationId) => fromEntities.getImagesIsFetching(state.entities, destinationId);

export const getCountries = (state) => fromEntities.getCountries(state.entities);
export const getCountriesIsFetching = (state) => fromEntities.getCountriesIsFetching(state.entities);

export const getCities = (state) => fromEntities.getCities(state.entities);
export const getCitiesIsFetching = (state) => fromEntities.getCitiesIsFetching(state.entities);

export const getVideos = (state) => fromEntities.getVideos(state.entities);
export const getVideosByCountry = (state) => fromEntities.getVideosByCountry(state.entities);
export const getVideosIsFetching = (state) => fromEntities.getVideosIsFetching(state.entities);

export const getDestination = (state) => fromDestination.getDestination(state.destination);
export const getDestinationIsFetching = (state) => fromDestination.getIsFetching(state.destination);
