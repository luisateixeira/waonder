import React from 'react';
import './style.scss';
import {withPageScroll} from './withPageScroll/';
import Intro from './Intro/';
import Video from './Video/';
import Country from './Country/';
import Photos from './Photos/';
import ScrollControls from './ScrollControls/';

class Destination extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isVideoReady: false,
      isIntroCompleted: false,
      isGaleryVisible: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {destination, images, scroll, gotoPage, setMaxPage} = this.props;
    const galleryIsVisible = (scroll.page > 0) && this.isGalleryEnabled(images);

    if (destination.id !== prevProps.destination.id) {
      this.setState(this.getInitialState());
      gotoPage(0);
    } else {
      if (prevState.isGaleryVisible !== galleryIsVisible) {
        this.setState({
          isGaleryVisible: galleryIsVisible
        });
      }
    }

    if (images) {
      if (!prevProps.images ||
          prevProps.images.length !== images.length) {
            setMaxPage(images.length);
          }
    }
  }

  videoIsReady() {
    this.setState({isVideoReady: true});
  }

  introIsCompleted() {
    this.setState({isIntroCompleted: true});
  }

  isGalleryEnabled(images) {
    return images && images.length;
  }

  render() {
    const {destination, images, gotoDestination, scroll, gotoPage} = this.props;
    const {isVideoReady, isGaleryVisible, isIntroCompleted} = this.state;

    return (
      <div className={'destination' + (isGaleryVisible ? ' gallery-visible' : '')}>

        <Video {...destination.video}
               className={isVideoReady && isIntroCompleted ? 'show' : ''}
               setIsReady={() => this.videoIsReady()} />

        <Intro key={destination.id}
               className={isVideoReady && isIntroCompleted ? 'hide' : ''}
               country={destination.country}
               showPreloader={!isVideoReady && isIntroCompleted}
               setIsCompleted={() => this.introIsCompleted()} />

        {this.isGalleryEnabled(images) ? <ScrollControls/> : null}
        {this.isGalleryEnabled(images) ? <Photos images={images} scroll={scroll} /> : null}

        <Country destination={destination} className={isVideoReady && isIntroCompleted ? 'show' : ''} />
        <div className="destination--back-to-video-button" onClick={() => gotoPage(0)}></div>
        <div className="destination--next-button" onClick={gotoDestination}></div>
      </div>
    )
  }
}

Destination.propTypes = {
  images: React.PropTypes.array,
  destination: React.PropTypes.object.isRequired,
  gotoDestination: React.PropTypes.func.isRequired,
  scroll: React.PropTypes.object.isRequired,
  gotoPage: React.PropTypes.func.isRequired,
  setMaxPage: React.PropTypes.func.isRequired,
}

export default withPageScroll(Destination);
