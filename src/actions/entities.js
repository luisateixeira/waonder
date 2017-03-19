import config from '../config';
import {countryListSchema, videoListSchema} from './schema';
import {getCountries, getCities} from '../reducers';
import {normalize} from 'normalizr';

export const FETCH_VIDEOS_START = 'FETCH_VIDEOS_START';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';

const processVideos = (response, getState) => {
  const countriesEntities = getCountries(getState());
  const citiesEntities = getCities(getState());

  // assign countries for each video
  // filter out videos that have more then one country
  return response.data
    .map(video => {
      const id = video.uri.match(/(\d+)(?!.*\d)/)[0];
      const countries = [];
      for (let tag of video.tags) {
        const tagname = tag.canonical.replace(/ /g, '-');
        if (countriesEntities[tagname] || citiesEntities[tagname]) {
          const match = countriesEntities[tagname] ? tagname : citiesEntities[tagname].country;
          if (countries.indexOf(match) === -1) {
            countries.push(match);
          }
        }
      }
      return {id: id, countries: countries, ...video}
    })
    .filter(video => video.countries.length === 1);
}

export const fecthVideos = (uri, count=0) => ({
  types: [FETCH_VIDEOS_START, FETCH_VIDEOS_SUCCESS, FETCH_VIDEOS_FAILURE],
  headers: config.api.vimeo.headers,
  endpoint: uri || config.api.vimeo.uri,
  storage: config.api.vimeo.storage,
  processData: (response, getState) => normalize(processVideos(response, getState), videoListSchema),
  onComplete: (response, getState, dispatch) => { // load more videos on background.
    if (response.paging && response.paging.next && count < config.api.vimeo.bgRequestMax) {
      setTimeout(() => dispatch(fecthVideos(config.api.vimeo.uri + '&page=' + (+response.page+1), count+1)), config.api.vimeo.bgRequestDelay);
    }
  }
});


export const FETCH_COUNTRIES_START = 'FETCH_COUNTRIES_START';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';

export const fetchCountries = () => ({
  types: [FETCH_COUNTRIES_START, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_FAILURE],
  endpoint: config.api.countries.uri,
  storage: config.api.countries.storage,
  processData: response => normalize(response, countryListSchema)
});

export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export const fecthImages = (destinationId, query) => {
  return {
    types: [FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE],
    actionID: destinationId,
    endpoint: config.api.flickr.uri.replace('{query}', query),
    responseIsError: response => response.stat === 'fail',
    processData: response => response.photos.photo
      .filter((photo) => photo.url_l && (+photo.width_l > +photo.height_l))
      .map((photo) => ({
        url: photo.url_l,
        small: photo.url_t,
        link: config.api.flickr.link + photo.pathalias + '/' + photo.id,
        owner: photo.ownername,
        title: photo.title,
        description: photo.description,
        id: photo.id
      }))
  }
}
