import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  isLoading,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherType = weatherData?.type;
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType,
  );

  // Your weatherData uses temperature.F / temperature.C
  const temperature = weatherData?.temperature?.[currentTemperatureUnit] ?? "";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {temperature}°{currentTemperatureUnit}, you may want to wear:
        </p>

        {isLoading ? (
          <p className="cards__loading">Loading...</p>
        ) : (
          <ul className="cards__list">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id || item.id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
