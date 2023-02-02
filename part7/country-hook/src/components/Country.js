const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>{`capital ${country.capital[0]}`}</div>
      <div>{`population ${country.population}`}</div>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Country;
