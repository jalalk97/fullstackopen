import { useState } from "react";
import countryService from "./services/countries";

import Country from "./components/Country";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await countryService.get(query);
      setCountry(data[0]);
    } catch (error) {
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {isLoading ? (
        <div>loading...</div>
      ) : country ? (
        <Country country={country} />
      ) : (
        <div>not found...</div>
      )}
    </div>
  );
};

export default App;
