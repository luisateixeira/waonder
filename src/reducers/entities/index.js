import {combineReducers} from 'redux';
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
  fromVideos.getVideosByCountry(state.videos);
export const getVideos = (state) =>
  fromVideos.getEntities(state.videos);
export const getVideosIsFetching = (state) =>
  fromVideos.getIsFetching(state.videos);

export const getCountries = (state) =>
  fromCountries.getEntities(state.countries);
export const getCountriesIsFetching = (state) =>
  fromCountries.getIsFetching(state.countries);

export const getCities = (state) =>
  fromCities.getEntities(state.cities);
export const getCitiesIsFetching = (state) =>
  fromCities.getIsFetching(state.countries);

export const getImages = (state, destinationId) =>
  fromImages.getEntities(state.images, destinationId);
export const getImagesIsFetching = (state, destinationId) =>
  fromImages.getIsFetching[destinationId];

export const getAllDestinationsIsFetching = (state) => [
  getCountriesIsFetching(state),
  getCitiesIsFetching(state),
  getVideosIsFetching(state)
].some(function(value) {return value === true}) && fromVideos.getTotal(state.videos) === 0;
