/*global FB*/
import React from 'react';
import config from '../../config';
import {Link, withRouter} from 'react-router';
import './style.scss';

const shareFacebook = () => {
  FB.ui({
    method: 'share',
    href: 'http://www.waonder.com',
  });
}

const shareTwitter = () => {
  const text = 'www.waonder.com - ' + config.description;
  return 'https://twitter.com/intent/tweet?text=' + text;
}

const getAboutButtonLink = (pathname) => {
  return (pathname === '/') ? '/about' : '/';
}

const getClassname = (pathname) => {
  return (pathname !== '/') ? ' inverted' : '';
}

const handleLogoClick = (pathname, resetDestinaton) => {
  if (pathname === '/') {
    resetDestinaton();
  }
}

const Header = ({location, destination, resetDestinaton}) => {
  return (
    <div className={'header' + (getClassname(location.pathname))}>
      <div className="header--left">
        {destination || (location.pathname !== '/') ?
          <div className="header--logo" onClick={() => handleLogoClick(location.pathname, resetDestinaton)}>
            wa<del>o</del>nder</div> : null
          }
      </div>
      <div className="header--right">
        <a className="header--share--facebook" onClick={shareFacebook}></a>
        <a className="header--share--twitter" href={shareTwitter()}></a>
        <Link className="header--about-button" to={getAboutButtonLink(location.pathname)}></Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
  resetDestinaton: React.PropTypes.func.isRequired,
  destination: React.PropTypes.object,
}

export default withRouter(Header);
