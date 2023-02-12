/*global FB*/
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import config from './config';
import Root from './containers/Root';
import './styles/index.scss';

const store = configureStore();
const rootElement = document.getElementById('root');
const render = () => {
  ReactDOM.render(
      <Root store={store}/>,
    rootElement);
}

render();

window.fbAsyncInit = () => {
  FB.init({
    appId: config.api.facebook.appId,
    xfbml: true,
    version: 'v2.8'
  });
};
