import React from 'react';
import './style.scss';

const ScrollControls = () => {
  return (
    <div className="destination--scroll-controls">
        <div className="destination--scroll-controls--scrolldown-icon"></div>
        <div className="destination--scroll-controls--arrowpad-icon">
          <div className="destination--scroll-controls--arrowpad-icon--left-arrow"></div>
          <div className="destination--scroll-controls--arrowpad-icon--right-arrow"></div>
          <div className="destination--scroll-controls--arrowpad-icon--up-arrow"></div>
          <div className="destination--scroll-controls--arrowpad-icon--down-arrow"></div>
        </div>
    </div>
  )
}

export default ScrollControls;
