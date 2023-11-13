import React, { useEffect, useState } from "react";
import countryService from './components/countryService'
import Countries from "./components/Countries";

const Filter = (props) => {
  return (
    <div>
      find countries&nbsp;<input value={props.filter} onChange={props.eventHandler}/>
    </div> 
  );
}

const App = () => {
  const [countries, setCounties] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCounties(allCountries)
      })
  }, [])

  const showCountry = (country) => {
    setCountryFilter(country)
  }

  const handleNewFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={countryFilter} eventHandler={handleNewFilter} />
      <Countries key={countries.name} countries={countries} countryFilter={countryFilter} handleShowCountry={showCountry} />
    </div>
  );
}

export default App;
