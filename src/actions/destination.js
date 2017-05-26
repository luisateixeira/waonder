
import {v1} from 'node-uuid';
import * as entitiesActionCreators from './entities';
import * as fromReducers from '../reducers';
import * as fromLocalStorage from '../utils/localStorage';
import config from '../config';

const disabledCountriesKey = config.localStorage.appKey + 'disabled_countries';

const disableCountry = (country) => {
  const disabledCountries = fromLocalStorage.getItem(disabledCountriesKey) || [];
  disabledCountries.push(country);
  fromLocalStorage.setItem(disabledCountriesKey, disabledCountries);
}

const resetDisabledCountries = () => {
  fromLocalStorage.removeItem(disabledCountriesKey);
}

const getAvailableCountries = (countries) => {
  const disabledCountries = fromLocalStorage.getItem(disabledCountriesKey) || [];
  const availableCountries =  countries.filter(country => disabledCountries.indexOf(country) === -1);

  if (countries.length && availableCountries.length === 0) {
    resetDisabledCountries();
    return getAvailableCountries(countries);
  }
  return availableCountries;
}

const generateDestination = ({countries:countryEntities, videos:videoEntities, videosByCountry}) => {
  const availableCountries = getAvailableCountries(Object.keys(videosByCountry));

  if (availableCountries.length) {
    const randomCountryID = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    const videosFromRandomCountry = videosByCountry[randomCountryID];
    const randomVideoID = videosFromRandomCountry[Math.floor(Math.random() * videosFromRandomCountry.length)];

    disableCountry(randomCountryID);

    return {
      id: v1(),
      video: videoEntities[randomVideoID],
      country: countryEntities[randomCountryID]
    };
  }
  return null;
}

export const FETCH_DESTINATION_START = 'FETCH_DESTINATION_START';
export const FETCH_DESTINATION_SUCCESS = 'FETCH_DESTINATION_SUCCESS';
export const FETCH_DESTINATION_FAILURE = 'FETCH_DESTINATION_FAILURE';

export const fetchDestination = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_DESTINATION_START
  });

  const destination = generateDestination({
    countries: fromReducers.getCountries(getState()).toJS(),
    videos: fromReducers.getVideos(getState()).toJS(),
    videosByCountry: fromReducers.getVideosByCountry(getState()).toJS()
  });

  if (destination) {
    dispatch({
      type: FETCH_DESTINATION_SUCCESS,
      response: destination
    });
  } else {
    dispatch({
      type: FETCH_DESTINATION_FAILURE,
      error: 'No destination found'
    });
  }
}

export const FETCH_ALL_DESTINATIONS_START = 'FETCH_ALL_DESTINATIONS_START';
export const FETCH_ALL_DESTINATIONS_SUCCESS = 'FETCH_ALL_DESTINATIONS_SUCCESS';
export const FETCH_ALL_DESTINATIONS_FAILURE = 'FETCH_ALL_DESTINATIONS_FAILURE';

export const fetchAllDestinations = () => (dispatch, getState) => {
  const countries = fromReducers.getCountries(getState()).toJS();
  const videos = fromReducers.getVideos(getState()).toJS();
  const fetchCountries = () => Object.keys(countries).length ? Promise.resolve() : dispatch(entitiesActionCreators.fetchCountries());
  const fecthVideos = () => Object.keys(videos).length ? Promise.resolve() : dispatch(entitiesActionCreators.fecthVideos());

  dispatch({
    type: FETCH_ALL_DESTINATIONS_START
  });

  return fetchCountries()
      .then(fecthVideos)
      .then(
        () => dispatch({
          type: FETCH_ALL_DESTINATIONS_SUCCESS
        }),
        error => dispatch({
          type: FETCH_ALL_DESTINATIONS_FAILURE,
          error: error
        }));
}

export const RESET_DESTINATION = 'RESET_DESTINATION';

export const resetDestinaton = () => ({
  type: RESET_DESTINATION
});
