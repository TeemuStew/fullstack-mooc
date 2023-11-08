import React from 'react';
import CountryInfo from './CountryInfo';

const Countries = ({ countries, showCountries, setSelectedCountry }) => {
  return (
    <div>
      {showCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : showCountries.length === 1 ? (
        <CountryInfo country={showCountries[0]} />
      ) : (
        <ul>
          {showCountries.map((country) => (
            <li key={country.alpha2Code}>
              {country.name.replace(/^.+?\s/, '')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Countries;
