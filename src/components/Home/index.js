import './style.scss';
import React from 'react';
import Preloader from './Preloader';
import config from '../../config';
import loadImage from '../../utils/loadImage';
import bgImage from './images/bg.jpg'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.imageLoader = loadImage(
      bgImage, () => {
        if (!this.componentUnmounted) {
          this.setState({loaded: true});
        }
      }
    );
  }

  componentWillUnmount() {
    this.componentUnmounted = true;
    if (this.imageLoader) {
      this.imageLoader.abort();
      this.imageLoader = null;
    }
  }

  getStartButton(isFetching, gotoDestination) {
    if (isFetching) {
      return <Preloader/>;
    }
    return <button onClick={gotoDestination} className="home--presentation-container--start--button"></button>;
  }

  getHeadsetSugestion(isFetching) {
    return <div className={'home--headset' + (!isFetching ? ' show': '')}>
              <div className="home--headset--icon"></div>
              <div className="home--headset--text">
                For the best experience<br></br>use your headphones
              </div>
            </div>;
  }

  render() {
    const {isFetching, gotoDestination} = this.props;
    return (
      <div className="home">

        <div className="home--bkg-wrapper">
          <div className="home--bkg-wrapper--placeholder"></div>
          <div className={'home--bkg-wrapper--original' + (this.state.loaded ? ' show' : '')}
               style={this.state.loaded ? {backgroundImage: 'url(' + bgImage + ')'} : null}></div>
          <div className="home--bkg-wrapper--overlay"></div>
        </div>

        <div className="home--presentation-container">
          <div className="home--presentation-container--title">wa<span>o</span>nder</div>
          <div className="home--presentation-container--subtitle">{config.description}</div>

          <div className="home--presentation-container--start">
            {this.getStartButton(isFetching, gotoDestination)}
          </div>
        </div>

        {this.getHeadsetSugestion(isFetching)}
      </div>
    );
  }
}

Home.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  gotoDestination: React.PropTypes.func.isRequired
}

export default Home;
