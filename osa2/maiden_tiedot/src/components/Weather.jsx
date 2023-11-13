import { useState, useEffect } from 'react';
import countryService from '../components/countryService';

const Weather = ({ filteredCountries, country }) => {
  const [city, setCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    if (filteredCountries && filteredCountries.length > 0 && city) {
      countryService
        .getWeather(filteredCountries[0])
        .then(currentWeather => {
          setWeatherInfo(currentWeather);
        });
    }
  }, [city, filteredCountries]);

  if (filteredCountries && filteredCountries.length > 0) {
    if (Object.keys(filteredCountries[0].capitalInfo).length !== 0) {
      if (city !== filteredCountries[0].capitalInfo.latlng[0]) {
        setCity(filteredCountries[0].capitalInfo.latlng[0]);
      }
      if (weatherInfo !== undefined) {
        return (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weatherInfo.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt='icon displaying current weather' />
            <p>wind {weatherInfo.wind.speed} m/s</p>
          </div>
        );
      }
    } else {
      if (city !== filteredCountries[0].latlng[0]) {
        setCity(filteredCountries[0].latlng[0]);
      }
      if (weatherInfo !== undefined) {
        return (
          <div>
            <h2>Weather in {country.name.common}</h2>
            <p>temperature {weatherInfo.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt='icon displaying current weather' />
            <p>wind {weatherInfo.wind.speed} m/s</p>
          </div>
        );
      }
    }
  }
}

export default Weather;
