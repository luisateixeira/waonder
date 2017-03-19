import React from 'react';
import './style.scss';
import {whichAnimationEndEvent} from '../../../utils/animationEvents'

class Intro extends React.Component {

  componentDidMount() {
    const animationEvent = whichAnimationEndEvent();
    const {setIsCompleted} = this.props;
    animationEvent && this.animationElement.addEventListener(animationEvent, setIsCompleted);
  }

  render() {
    const {country, className, showPreloader} = this.props;
    return (
      <div className={'destination--intro ' + className}>
        <div>
          in <div className="destination--intro--typewriter"
                  ref={element => this.animationElement = element}>{country.name}</div>
        </div>

        <div className={'destination--intro--preloader' + (showPreloader ? ' show' : '')}></div>
      </div>
    );
  }
}

Intro.propTypes = {
  country: React.PropTypes.object.isRequired,
  showPreloader: React.PropTypes.bool.isRequired,
  setIsCompleted: React.PropTypes.func.isRequired,
  className: React.PropTypes.string
}

export default Intro;
