import {combineReducers} from 'redux-immutable';
import videos, * as fromVideos from './videos';
import countries, * as fromCountries from './countries';
import cities, * as fromCities from './cities';
import images, * as fromImages from './images';

export default combineReducers({
  countries,
  cities,
  videos,
  images
});

export const getVideosByCountry = (state) =>
  fromVideos.getVideosByCountry(state.get('videos'));
export const getVideos = (state) =>
  fromVideos.getEntities(state.get('videos'));
export const getVideosIsFetching = (state) =>
  fromVideos.getIsFetching(state.get('videos'));

export const getCountries = (state) =>
  fromCountries.getEntities(state.get('countries'));
export const getCountriesIsFetching = (state) =>
  fromCountries.getIsFetching(state.get('countries'));

export const getCities = (state) =>
  fromCities.getEntities(state.get('cities'));
export const getCitiesIsFetching = (state) =>
  fromCities.getIsFetching(state.get('countries'));

export const getImages = (state, destinationId) =>
  fromImages.getEntities(state.get('images'), destinationId);
export const getImagesIsFetching = (state, destinationId) =>
  fromImages.getIsFetching[destinationId];

export const getAllDestinationsIsFetching = (state) => [
  getCountriesIsFetching(state),
  getCitiesIsFetching(state),
  getVideosIsFetching(state)
].some(function(value) {return value === true}) && fromVideos.getTotal(state.get('videos')) === 0;
