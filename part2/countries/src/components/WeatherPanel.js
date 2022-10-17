const WeatherPanel = (props) => {
  const { data } = props;
  const { location, current } = data

  return (
    <div>
      <h3>Weather in {location.name}</h3>
      <div>temperature {current.temp_c} Celcius</div>
      <img src={current.condition.icon} />
      <div>wind {current.wind_kph} km/h</div>
    </div>
  );
};

export default WeatherPanel;
