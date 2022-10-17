const CountryInfo = props => {
    const { country } = props;
    const { name, capital, area, languages, flags } = country;

    return (
      <div>
        <h2>{name.common}</h2>
        <div>capital {capital[0]}</div>
        <div>area {area}</div>
        <h4>languages:</h4>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flags.png} />
      </div>
    );
};

export default CountryInfo;