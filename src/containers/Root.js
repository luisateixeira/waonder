import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import About from '../components/About';
import {Router, Route, browserHistory} from 'react-router';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} >
          <Route path='/about' component={About} />
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}

export default Root;
