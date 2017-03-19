import React from 'react';
import Photo from './Photo/'
import './style.scss';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.randomizedImages = [...props.images].sort(() => 0.5 - Math.random());
    this.previousVisiblePage = undefined;
  }

  componentWillUpdate(nextProps) {
    if (this.getVisiblePage(this.props.scroll.page) !== this.getVisiblePage(nextProps.scroll.page)) {
      this.previousVisiblePage = this.getVisiblePage(this.props.scroll.page);
    }
  }

  getVisiblePage(page) {
    const total = this.props.images.length;
    return (page > total) ? total : page;
  }

  getImageClassName(index, current, last, direction) {
    let className = '';
    if (current === index) {
      className += ' active ' + direction;
    } else if ((last === index)) {
      if (current === 0) {
        className += ' first';
      } else {
        className += ' last';
      }
    }
    return className;
  }

  render() {
    const visiblePage = this.getVisiblePage(this.props.scroll.page);

    return (
      <div className="destination--photos">
        {
        this.randomizedImages
          .map((image, index) => {
            const imgIndex = index + 1;
            return (
              <Photo key={image.id}
                     image={image}
                     isVisible={visiblePage === imgIndex}
                     className={this.getImageClassName(
                                imgIndex,
                                visiblePage,
                                this.previousVisiblePage,
                                this.props.scroll.direction
                              )}/>
              )
          }

        )}
      </div>
    );
  }
}

Photos.propTypes = {
  scroll: React.PropTypes.object.isRequired,
  images: React.PropTypes.array,
}

export default Photos;
