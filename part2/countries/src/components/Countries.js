import Country from "./Country";

const Countries = (props) => {
  const { countries } = props;
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <div>
        {countries.map((country) => (
          <Country
            key={country.name.common}
            countryInfo={country}
            verbose={countries.length === 1}
          />
        ))}
      </div>
    );
  }
};

export default Countries;
