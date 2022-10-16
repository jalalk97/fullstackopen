const Country = (props) => {
  let { countryInfo, showDetails, onClick } = props;
  const { name, capital, area, languages, flags } = countryInfo;

  if (showDetails) {
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
  } else {
    return (
      <div>
        {name.common} <button onClick={onClick(name.common)}>show</button>
      </div>
    );
  }
};

export default Country;
