import React from 'react';
import './style.scss';

const About = () => {
  return (
    <div className="about">
      <div className="about--wrapper">
        <h2 className="about--wrapper--title">About</h2>
        <div className="about--wrapper--text">
          <strong>Wondering where to explore next?</strong>
          <br></br>
          <i>wa<del>o</del>nder</i> is a side project and visual experiment that takes you around the world through amazing travel and exploration videos and photography.
          <br></br>
          It aims to inspire you to get outside and explore our incredible planet by showcasing random destinations.
          <br></br>
          All the videos are powered by <a href="https://vimeo.com/" target="_black">vimeo</a> and the photos by <a href="https://www.flickr.com/" target="_black">flirck</a>.
        </div>
        <div className="about--wrapper--credits">made with <span></span> by
          <a href="http://www.luisateixeira.com" target="_blank">Luisa Teixeira</a>
        </div>
      </div>
    </div>
  )
}

export default About;
