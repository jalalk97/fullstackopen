import { useState, useEffect } from "react";
import axios from "axios";

import CountryList from "./components/CountryList";
import CountryView from "./components/CountryView";
import Filter from "./components/Filter";

const apiKey = process.env.REACT_APP_API_KEY;
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q`;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.filter((country) => isMatch(country)));
    });
  }, [query]);

  useEffect(() => {
    if (countries.length === 1) {
      axios.get(`${url}${countries[0].capital[0]}`).then((response) => {
        setWeatherData(response.data);
      });
    } else {
      setWeatherData({});
    }
  }, [countries.length]);

  const handleClick = (countryName) => () =>
    setCountries(
      countries.filter((country) => country.name.common === countryName)
    );

  const isMatch = (country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase());

  return (
    <div>
      <Filter
        filter={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {countries.length === 1 ? (
        <CountryView country={countries[0]} weatherData={weatherData} />
      ) : (
        <CountryList countries={countries} onClick={handleClick} />
      )}
    </div>
  );
};

export default App;
