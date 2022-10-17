import CountryInfo from "./CountryInfo";
import WeatherPanel from "./WeatherPanel";

const CountryView = (props) => {
  const { country, weatherData } = props;
  return (
    <div>
      <CountryInfo country={country} />
      {Object.keys(weatherData).length > 0 && (
        <WeatherPanel data={weatherData} />
      )}
    </div>
  );
};

export default CountryView;