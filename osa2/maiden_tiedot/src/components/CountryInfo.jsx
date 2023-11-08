import React from 'react';

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p>languages:</p>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flags[1]}
        alt={`Flag of ${country.name}`}
        width="100"
      />
    </div>
  );
};

export default CountryInfo;
