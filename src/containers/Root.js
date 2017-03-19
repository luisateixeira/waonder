import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Main from './Main';

const routes = (
  <Route path='/' component={App} >
    <IndexRoute component={Main}/>
  </Route>
);

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );
}


Root.propTypes = {
  store: React.PropTypes.object.isRequired
}

export default Root;
