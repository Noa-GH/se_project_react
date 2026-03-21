import "./App.css";
import avatarUrl from "../../assets/icons/avatar-icons/AviPlaceholderTrue.svg";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Routes, Route } from "react-router-dom";
import { getWeatherData, getItems, addItem, deleteItem } from "../../utils/api";
import {
  coordinates,
  APIkey,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { useState, useEffect } from "react";

function App() {
  // Default state matches the structure used in Main.jsx
  const [weatherData, setWeatherData] = useState({
    temperature: { F: 75, C: 24 },
    city: "",
    condition: "",
    image: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const currentUser = {
    name: "Noah",
    avatar: avatarUrl,
  };

  // Handle Functions
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
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
  // handle add garment (POST)
  // ==================================
  function handleAddGarment({ name, imageUrl, weather }) {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => console.error("Failed to add item:", error));
  }
  // ==================================
  // handle delete item (DELETE)
  // ==================================
  function handleDeleteItem(id) {
    deleteItem(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Failed to delete item:", error));
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

  // Fetch clothing items on mount
  // ==================================
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  // Fetch weather data on component mount
  // ==================================
  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const weather = {};
        weather.temperature = {};
        weather.temperature.F = Math.round(data.main.temp);
        weather.temperature.C = Math.round((data.main.temp - 32) * 5 / 9);
        weather.city = data.name;
        weather.condition = data.weather[0].description;
        weather.image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        setWeatherData(weather);
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
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <div className="page__content">

            <Header
              onAddClothesClick={handleOpenAddClothesModal}
              weatherData={weatherData}
              currentUser={currentUser}
            />
            <Routes>
              <Route path="/"
                element={<Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />} />
              <Route 
                path="/profile" 
                element={
                  <Profile 
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleOpenAddClothesModal}
                    handleDeleteItem={handleDeleteItem}
                    currentUser={currentUser}
                  />
                }
              />
            </Routes>
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </>
  );
}

export default App;
