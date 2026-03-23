import "./App.css";
import avatarUrl from "../../assets/icons/avatar-icons/AviPlaceholderTrue.svg";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Routes, Route } from "react-router-dom";
import { getWeatherData } from "../../utils/api";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { useState, useEffect } from "react";

// Your custom hook!
import useClothingItems from "../../hooks/useClothingItems";

function App() {
  // Weather state
  const [weatherData, setWeatherData] = useState({
    temperature: { F: 75, C: 24 },
    city: "",
    condition: "",
    image: "",
  });

  // Modal state
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);

  // Temperature unit
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // 🎉 USE YOUR CUSTOM HOOK HERE!
  // This replaces all the clothing item logic that was in App.jsx
  const {
    clothingItems,
    isLoading,
    error,
    handleAddItem,
    handleDeleteItem,
    clearError,
  } = useClothingItems();

  const currentUser = {
    name: "Noah",
    avatar: avatarUrl,
  };

  // Temperature toggle
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Modal handlers
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

  function handleRequestDelete(card) {
    if (!card || card._id === undefined || card._id === null) return;
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }

  // Add garment - now uses your custom hook!
  async function handleAddGarment(data) {
    const result = await handleAddItem(data);
    if (result.success) {
      handleCloseModal();
    }
    // If error, the hook already set the error state
  }

  // Delete item - now uses your custom hook!
  async function handleDeleteGarment(id) {
    const result = await handleDeleteItem(id);
    if (result.success) {
      setCardToDelete(null);
      setSelectedCard({});
      handleCloseModal();
    }
  }

  async function handleConfirmDelete() {
    if (!cardToDelete || cardToDelete._id === undefined || cardToDelete._id === null) {
      return;
    }
    await handleDeleteGarment(cardToDelete._id);
  }

  function handleCancelDelete() {
    setCardToDelete(null);
    setActiveModal("preview");
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

  // Fetch weather data on mount
  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const weather = {};
        weather.temperature = {};
        weather.temperature.F = Math.round(data.main.temp);
        weather.temperature.C = Math.round(((data.main.temp - 32) * 5) / 9);
        weather.city = data.name;
        weather.condition = data.weather[0].description;
        weather.image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        setWeatherData(weather);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  // Loading state - from your hook!
  if (isLoading && clothingItems.length === 0) {
    return (
      <div className="page">
        <div className="page__loading">Loading clothing items...</div>
      </div>
    );
  }

  // Error state - from your hook!
  if (error && clothingItems.length === 0) {
    return (
      <div className="page">
        <div className="page__error">
          Error: {error}
          <button onClick={clearError}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            onAddClothesClick={handleOpenAddClothesModal}
            weatherData={weatherData}
            currentUser={currentUser}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleOpenAddClothesModal}
                  currentUser={currentUser}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddGarment}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          selectedCard={selectedCard}
          onRequestDelete={handleRequestDelete}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          itemName={cardToDelete?.name}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;