import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
// import getWeatherData from "../../utils/weatherApi";
import { getWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import { useState, useEffect } from "react";

function App() {
  // Default state matches the structure used in Main.jsx
  const [weatherData, setWeatherData] = useState({ temp: { F: 75 }, city:"" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleOpenAddClothesModal() {
    setActiveModal("add-garment");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  // Close on Escape key
  useEffect(() => {
    if (!activeModal) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  // Fetch weather data on component mount
  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        // Transform API response to match expected structure
        // OpenWeatherMap returns temperature as data.main.temp (in Fahrenheit)
        setWeatherData({ 
          temp: { F: Math.round(data.main.temp) },
          city: data.name,
         });
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
        // Keep fallback data if fetch fails
      });
  }, []);

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header onAddClothesClick={handleOpenAddClothesModal} weatherData={weatherData}/>
          <Main weatherData={weatherData} onCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          name="add-garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
        >
          {/* Form inputs will go here as children */}
        </ModalWithForm>
        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          selectedCard={selectedCard}
        />
      </div>
    </>
  );
}

export default App;
