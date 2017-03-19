import React from 'react';
import Footer from '../components/Footer';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllDestinations();
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  fetchAllDestinations: React.PropTypes.func.isRequired
}

import {connect} from 'react-redux';
import {fetchAllDestinations} from '../actions/destination';

const mapDispatchToProps = {
  fetchAllDestinations: fetchAllDestinations
}

export default connect(
  null,
  mapDispatchToProps
)(App);
