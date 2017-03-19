import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Destination from '../components/Destination';
import Home from '../components/Home';

class Container extends React.Component {

  componentDidUpdate(prevProps) {
    const {destination, fecthImages} = this.props;
    if (destination) {
      if (!prevProps.destination || (prevProps.destination.id !== destination.id)) {
        fecthImages(destination.id, destination.country.name);
      }
    }
  }

  gotoDestination() {
    const {allDestinationsIsFetching, fetchDestination} = this.props;
    if (!allDestinationsIsFetching) {
      fetchDestination();
    }
  }

  getView() {
    const {destination, images, resetDestinaton, allDestinationsIsFetching} = this.props;

    if (destination) {
      return <Destination gotoDestination={() => this.gotoDestination()}
                          resetDestinaton={resetDestinaton}
                          {...{destination, images}}
                          key='destination' />
    }
    return <Home gotoDestination={() => this.gotoDestination()}
                 isFetching={allDestinationsIsFetching}
                 key='home'/>
  }

  render() {

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="main-page"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {this.getView()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Container.propTypes = {
  allDestinationsIsFetching: React.PropTypes.bool.isRequired,
  fecthImages: React.PropTypes.func.isRequired,
  destination: React.PropTypes.object,
  images: React.PropTypes.array,
  fetchDestination: React.PropTypes.func.isRequired,
  resetDestinaton: React.PropTypes.func.isRequired
}

import {connect} from 'react-redux';
import {fetchDestination, resetDestinaton} from '../actions/destination';
import {fecthImages} from '../actions/entities';
import {getDestination, getImages, getAllDestinationsIsFetching} from '../reducers';

const mapStateToProps = (state) => {
  const destination = getDestination(state);
  return {
    destination: destination,
    images: destination ? getImages(state, destination.id) : null,
    allDestinationsIsFetching: getAllDestinationsIsFetching(state)
  }
}

const mapDispatchToProps = {
  fecthImages: fecthImages,
  fetchDestination: fetchDestination,
  resetDestinaton: resetDestinaton
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
