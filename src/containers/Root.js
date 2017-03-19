import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import Main from './Main';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <App>
        <Main/>
      </App>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}

export default Root;
