import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setShowCountries(filteredCountries);
  };

  return (
    <div>
      <div>
        find countries: <input value={searchTerm} onChange={handleSearch} />
      </div>
      <Countries
        countries={countries}
        showCountries={showCountries}
      />
    </div>
  );
}

export default App;
