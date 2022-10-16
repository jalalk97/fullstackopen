import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, [countryFilter]);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleButtonClick = (countryName) => {
    return (event) => {
      console.log(event);
      setCountries(countries.filter(
        (country) => country.name.common === countryName
      ));
    };
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div>
      <Filter value={countryFilter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} onClick={handleButtonClick} />
    </div>
  );
};

export default App;
