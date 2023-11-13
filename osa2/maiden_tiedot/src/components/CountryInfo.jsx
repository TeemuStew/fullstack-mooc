import React from 'react';

const ListLanguage = ({ language }) => <li>{language}</li>

const ListFlag = ({ flag, country }) => {
    return <img src={flag} width="350" height="200" alt={`Flag of ${country}`} />
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p>languages:</p>
      <ul>
        {country.languages.map((language) => (
          <ListLanguage key={language.name} language={language.name} />
        ))}
      </ul>
      <ListFlag flag={country.flags[1]} country={country.name} />
    </div>
  );
};

export default CountryInfo;
