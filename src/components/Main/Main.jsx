import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(clothingItems);
  const filteredClothingItems = (clothingItems || []).filter((item) => {
    // To check item id is a string or number and if it consoles undefined
    // console.log("item.id:", item.id, typeof item.id);
    // We still use Fahrenheit as our internal baseline for logic
    const temp = weatherData.temperature.F
    const weather = item.weather.toLowerCase()
    if (temp >= 86) return item.weather === "hot";
    if (temp >= 66) return item.weather === "warm";
    return weather === "cold";
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.temperature[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__items">
          {filteredClothingItems.map((item) => (
            <ItemCard key={item.id ?? item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
