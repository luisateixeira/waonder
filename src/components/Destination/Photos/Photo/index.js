import React from 'react';
import loadImage from '../../../../utils/loadImage';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.isVisible !== this.props.isVisible) &&
        (this.props.isVisible) && (this.state.loaded === false)) {
          this.imageLoader = loadImage(
            this.props.image.url, () => {
              if (!this.componentUnmounted) {
                this.setState({loaded: true});
              }
            }
          );
    }
  }

  componentWillUnmount() {
    this.componentUnmounted = true;
    if (this.imageLoader) {
      this.imageLoader.abort();
      this.imageLoader = null;
    }
  }

  render() {
    const {image, className} = this.props;

    return (
      <div key={image.id} className={'destination--photos--single ' + className}>
        <div className={'destination--photos--single--image-wrapper' + (this.state.loaded ? ' loaded' : '')}>
          {
            this.state.loaded ?
            <div className="destination--photos--single--image-wrapper--original"
               style={{backgroundImage: 'url(' + image.url + ')'}}>
             </div> :
              <div className="destination--photos--single--image-wrapper--placeholder"
                   style={{backgroundImage: 'url(' + image.small + ')'}}>
              </div>
          }
        </div>
        <div className="destination--photos--single--user">
          <span>{image.title}</span> by<a href={image.link} target="_black">{image.owner}</a>@ flickr
        </div>
       </div>
     );
  }
}

Photo.propTypes = {
  image: React.PropTypes.object.isRequired,
  isVisible: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string
}

export default Photo;
