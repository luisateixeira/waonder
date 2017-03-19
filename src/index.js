/*global FB*/
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import config from './config';
import Root from './containers/Root';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css';
import './styles/index.scss';

const store = configureStore();
const rootElement = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store}/>
    </AppContainer>,
    rootElement);
}

render();

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render();
  });
}

window.fbAsyncInit = () => {
  FB.init({
    appId: config.api.facebook.appId,
    xfbml: true,
    version: 'v2.8'
  });
};
