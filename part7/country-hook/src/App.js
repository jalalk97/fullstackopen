import { useState } from "react";
import { useCountry } from "./hooks";

import Country from "./components/Country";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [query, setQuery] = useState("");
  const [country, isLoading, handleSubmit] = useCountry(query);

  return (
    <div>
      <SearchBar
        value={query}
        onChange={(event) => setQuery(event.target.value)}
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
