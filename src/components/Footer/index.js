/*global FB*/
import React from 'react';
import config from '../../config';
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

const Footer = () => {
  return (
    <div className="footer">
      <span className="footer--share">
        <a className="footer--share--facebook" onClick={shareFacebook}></a>
        <a className="footer--share--twitter" href={shareTwitter()}></a>
      </span>
    </div>
  );
}

export default Footer;


// <span className="footer--credits">made with wanderlust by
//   <a className="footer--credits--link" href="http://www.luisateixeira.com" target="_blank">luisa</a>
// </span>
