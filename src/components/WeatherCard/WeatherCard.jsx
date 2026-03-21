import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import sunny from "../../assets/WeatherImages/Sunny.png";
import cloudy from "../../assets/WeatherImages/Cloudy.png";
import rain from "../../assets/WeatherImages/Rain.png";
import snow from "../../assets/WeatherImages/Snow.png";
import storm from "../../assets/WeatherImages/Storm.png";
import fog from "../../assets/WeatherImages/Fog.png";

const weatherOptions = {
  sunny: sunny,
  cloudy: cloudy,
  rainy: rain,
  snowy: snow,
  stormy: storm,
  foggy: fog,
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherImage =
    weatherOptions[weatherData.condition] || weatherOptions.sunny;

  return (
    <section className="weather-card">
      <p className="weather-card__temp-text">
        {weatherData.temperature[currentTemperatureUnit]}°{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherImage}
        alt={weatherData.condition ?? "sunny weather"}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
