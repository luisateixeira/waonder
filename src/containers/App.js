import React from 'react';
import Header from '../components/Header';
import Main from './Main';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllDestinations();
  }

  render() {
    const {resetDestinaton, destination} = this.props;
    return (
      <div className="container">
        <Main />
        {this.props.children}
        <Header {...{resetDestinaton, destination}}/>
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
)(App);
