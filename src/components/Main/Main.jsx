import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="main__items">
          {defaultClothingItems
            .filter((item) => {
              if (weatherData.temp.F >= 86) return item.weather === "hot";
              if (weatherData.temp.F >= 66) return item.weather === "warm";
              return item.weather === "cold";
            })
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
