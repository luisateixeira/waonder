import React from 'react';
import Header from '../components/Header';
import Main from './Main';
import {toJS} from '../utils/toJS';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllDestinations();
  }

  render() {
    const {resetDestinaton, destination} = this.props;
    return (
      <div className="container">
        <div className="content">
          <Main />
          {this.props.children}
          <Header {...{resetDestinaton, destination}}/>
        </div>
        <div className="mobile">
          <div className="mobile--wrapper">
            <div className="mobile--wrapper--logo">wa<del>o</del>nder</div>
            <div className="mobile--wrapper--warning">Sorry :( <br></br>This app is not yet available for this device.<br></br>Please open it on your desktop.</div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element,
  fetchAllDestinations: React.PropTypes.func.isRequired,
  resetDestinaton: React.PropTypes.func.isRequired,
  destination: React.PropTypes.object,
}

import {connect} from 'react-redux';
import {fetchAllDestinations, resetDestinaton} from '../actions/destination';
import {getDestination} from '../reducers';

const mapStateToProps = (state) => {
  const destination = getDestination(state);
  return {
    destination
  }
}

const mapDispatchToProps = {
  fetchAllDestinations: fetchAllDestinations,
  resetDestinaton: resetDestinaton
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(App));
