import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}° F</p>
      <img
        src="https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/day/sunny.svg"
        alt="sunny"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
