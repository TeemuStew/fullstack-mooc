import Weather from './Weather';
import CountryInfo from './CountryInfo';

const Countries = ({ countries, countryFilter, handleShowCountry }) => {
  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  const displayCountry = countryList => (
    <div>
      {countryList.map(c => (
        <div key={c.name.common}>
          <CountryInfo country={c} />
          <Weather filteredCountries={countryList} country={c} />
        </div>
      ))}
    </div>
  );

  if (filteredCountries.length > 10) {
    return <div><p>Too many matches,specify another filter</p></div>;
  }

  if (filteredCountries.length === 1) {
    return displayCountry(filteredCountries);
  }

  if (filteredCountries.length > 1) {
    const specificFiltered = countries.find(c =>
      c.name.common.toLowerCase() === countryFilter.toLowerCase()
    );

    return (
      <div>
        {specificFiltered
          ? displayCountry([specificFiltered])
          : filteredCountries.map(c => (
              <div key={c.name.common}>
                <p>
                  {c.name.common}&nbsp;
                  <button id={c.name.common} onClick={() => handleShowCountry(c.name.common)}>
                    show
                  </button>
                </p>
              </div>
            ))}
      </div>
    );
  }
};

export default Countries;
