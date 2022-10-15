import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([]);
  // [
  //   {
  //     name: "Botswana",
  //     id: 1,
  //   },
  //   {
  //     name: "Swaziland",
  //     id: 2,
  //   },
  //   {
  //     name: "Sweden",
  //     id: 3,
  //   },
  //   {
  //     name: "Switzerland",
  //     id: 4,
  //   },
  // ]);
  const [countryFilter, setCountryFilter] = useState("");

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div>
      <Filter value={countryFilter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
