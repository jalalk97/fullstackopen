import matchers from "@testing-library/jest-dom/matchers";

const CountryList = (props) => {
  const { countries, onClick } = props;
  return (
    <div>
      {countries.length > 10
        ? "Too many matches, specify another filter"
        : countries.map((country) => (
            <div key={country.name.common}>
              <div>
                {country.name.common}{" "}
                <button onClick={onClick(country.name.common)}>show</button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CountryList;
