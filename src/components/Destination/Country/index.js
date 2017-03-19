import React from 'react';
import './style.scss';

const Country = ({destination, className}) => {
  const capital = destination.country.capital.replace(/-/g, ' ');

  return (
    <div className={'destination--country ' + className}>
      <div className="destination--country--name">
        in <span>{destination.country.name}</span>
      </div>
      <div className="destination--country--info">
        <div className="destination--country--info--row">local name: <span>{destination.country.nativeName}</span></div>
        <div className="destination--country--info--row">capital: <span>{capital}</span></div>
        <div className="destination--country--info--row">population: <span>{destination.country.population.toLocaleString()}</span></div>
        <div className="destination--country--info--row">region: <span>{destination.country.region + (destination.country.subregion ? ', ' + destination.country.subregion : '' )}</span></div>
      </div>
    </div>
  );
}

Country.propTypes = {
  destination: React.PropTypes.object.isRequired,
  className: React.PropTypes.string
}

export default Country;
