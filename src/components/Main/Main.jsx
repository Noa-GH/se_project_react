import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, onCardClick, clothingItems }) {
  const filteredClothingItems = clothingItems.filter((item) => {
    if (weatherData.temp.F >= 86) return item.weather === "hot";
    if (weatherData.temp.F >= 66) return item.weather === "warm";
    return item.weather === "cold";
  });
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.temp.F}° F / You may want to wear:
        </p>
        <ul className="main__items">
          {filteredClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
