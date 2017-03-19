import 'whatwg-fetch';
import * as fromLocalStorage from '../../utils/localStorage';
import config from '../../config';

const apiStorageKey = config.localStorage.appKey + 'api-';

const storeAPI = (endpoint, storageOptions) => ({
  get() {
    return storageOptions && fromLocalStorage.getItem(apiStorageKey + endpoint)
  },
  set(response) {
    if (storageOptions) {
      fromLocalStorage.setItem(
        apiStorageKey + endpoint,
        response,
        typeof(storageOptions) === 'object' ? storageOptions.expirationMin : null
      );
    }
  }
});

const callApi = (endpoint, requestOptions, storageOptions, callbacks) => {
  const storeAPIInstance = storeAPI(endpoint, storageOptions);
  const storeResponse = storeAPIInstance.get();

  if (storeResponse) {
    return Promise.resolve(storeResponse);
  }

  return fetch(endpoint, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then(response => {
      if (typeof(callbacks.responseIsError) === 'function' && callbacks.responseIsError(response)) {
        return Promise.reject(response);
      }

      storeAPIInstance.set(response);

      return response;
    });
}

const api = store => next => action => {

  if (!action.types) {
    return next(action);
  }

  if (!Array.isArray(action.types) ||
      action.types.length !== 3 ||
      !action.types.every(type => typeof(type) === 'string')) {
        throw new Error('Expected an array of 3 action types');
      }

  if (!action.endpoint) {
    throw new Error('endpoint key is not defined');
  }

  const {dispatch, getState} = store;
  const {endpoint, headers, actionID, types, storage, ...callbacks} = action;
  const [requestStart, requestSuccess, requestFailure] = types;
  const requestOptions = {};
  const actionExtras = actionID ? {actionID: actionID} : {};

  dispatch({
    type: requestStart,
    ...actionExtras
  });

  if (headers) {
    requestOptions.headers = new Headers();
    for (let header of headers) {
      requestOptions.headers.append(header.name, header.value);
    }
  }

  return callApi(
    endpoint,
    requestOptions,
    storage,
    callbacks)
    .then(
      response => {
        dispatch({
          type: requestSuccess,
          response: (typeof(callbacks.processData) === 'function' ? callbacks.processData(response, getState) : response),
          ...actionExtras
        });

        if (callbacks.onComplete) {
          callbacks.onComplete(response, getState, dispatch);
        }
      },
      error => {
        dispatch({
          type: requestFailure,
          error: error,
          ...actionExtras
        });
      });
}

export default api;
