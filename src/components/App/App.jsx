import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getWeatherData } from "../../utils/api";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { useState, useEffect } from "react";

function App() {
  // Default state matches the structure used in Main.jsx
  const [weatherData, setWeatherData] = useState({ temp: { F: 75 }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  // Handle Functions
  // TODO: implement toggle switch
  function handleToggleSwitch() {
    setToggleSwitch(!toggleSwitch);
  }
  // handle open add clothes modal
  // ==================================
  function handleOpenAddClothesModal() {
    setActiveModal("add-garment");
  }
  // ==================================
  // handle close modal
  // ==================================
  function handleCloseModal() {
    setActiveModal("");
  }
  // ==================================
  // handle card click
  // ==================================
  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }
  // ==================================
  // handle add garment
  // ================================== 
  function handleAddGarment(formData) {
    // Create a new item with unique ID
    const newItem = {
      _id:
        clothingItems.length > 0
          ? Math.max(...clothingItems.map((item) => item._id)) + 1
          : 1,
      name: formData.name,
      link: formData.link,
      weather: formData["weather-type"],
    };

    // Add new item to clothing items array
    setClothingItems([...clothingItems, newItem]);

    // Close the modal
    handleCloseModal();
  }
  // ==================================
  // Close on Escape key
  // ==================================
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
  // ==================================
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
  // ==================================

  // return JSX
  // ================================== 
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header
            onAddClothesClick={handleOpenAddClothesModal}
            weatherData={weatherData}
            toggleSwitch={toggleSwitch}
            onToggleSwitch={handleToggleSwitch}
          />
          <Main
            weatherData={weatherData}
            onCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          name="add-garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onSubmit={handleAddGarment}
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
