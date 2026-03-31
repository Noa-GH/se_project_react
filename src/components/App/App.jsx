import "./App.css";
import avatarUrl from "../../assets/icons/avatar-icons/AviPlaceholderTrue.svg";
import Header from "../Header/Header";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { Routes, Route } from "react-router-dom";
import { getWeatherData } from "../../utils/api";
import {
  coordinates as defaultCoordinates,
  APIkey,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { useState, useEffect, useRef, useCallback } from "react";

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

  // Geolocation state (per-user, with fallback)
  const [hasLocationPermission, setHasLocationPermission] = useState(null); // null | true | false
  const [locationMessage, setLocationMessage] = useState("");
  const [showLocationStatus, setShowLocationStatus] = useState(false);

  // 🎉 USE YOUR CUSTOM HOOK HERE!
  // This replaces all the clothing item logic that was in App.jsx
  const {
    clothingItems,
    isLoading,
    error,
    handleAddItem,
    handleDeleteItem,
    refetch,
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
    const key = card.id ?? card._id;

    if (!card || key == null) {
      console.error("Invalid card for deletion:", card);
      return;
    }

    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }

  // Add garment - now uses your custom hook!
  async function handleAddGarment(data) {
    const result = await handleAddItem(data);
    if (result.success) {
      handleCloseModal();
    } else {
      console.error("Failed to add garment:", result.error);
    }
  }

  // Delete item - now uses your custom hook!
  async function handleDeleteGarment(id) {
    try {
      const result = await handleDeleteItem(id);

      if (result.success) {
        setCardToDelete(null);
        setSelectedCard({});
        handleCloseModal();
      } else {
        console.error("Delete failed:", result.error);
        alert("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleDeleteGarment:", error);
      alert("An error occurred while deleting the item.");
    }
  }

  async function handleConfirmDelete() {
    if (!cardToDelete) {
      console.error("No card to delete");
      return;
    }

    const itemId = cardToDelete.id ?? cardToDelete._id;

    if (!itemId) {
      console.error("Card has no valid ID:", cardToDelete);
      return;
    }
    await handleDeleteGarment(itemId);
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

  const fetchAndSetWeather = useCallback(async (coords) => {
    try {
      const data = await getWeatherData(coords, APIkey);
      const weather = {
        temperature: {
          F: Math.round(data.main.temp),
          C: Math.round(((data.main.temp - 32) * 5) / 9),
        },
        city: data.name,
        condition: data.weather[0].description,
        image: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
      setWeatherData(weather);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setLocationMessage(
        "Unable to fetch local weather; showing fallback location.",
      );
    }
  }, []);

  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const hasRequestedLocation = useRef(false);

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setHasLocationPermission(false);
      setLocationMessage(
        "Geolocation is not supported in your browser. Showing default weather location.",
      );
      fetchAndSetWeather(defaultCoordinates);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setHasLocationPermission(true);
        const { latitude, longitude } = position.coords;
        setLocationMessage("Using your current location for weather data.");
        fetchAndSetWeather({ latitude, longitude });
      },
      (error) => {
        setHasLocationPermission(false);
        console.error("Geolocation error:", error);
        setLocationMessage(
          "Could not get your location. Showing default weather location.",
        );
        fetchAndSetWeather(defaultCoordinates);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      },
    );
  }, [fetchAndSetWeather]);

  const handleLocationDecision = useCallback(
    (consent) => {
      if (hasRequestedLocation.current) return;

      hasRequestedLocation.current = true;
      setShowLocationPrompt(false);

      if (consent === "granted") {
        localStorage.setItem("wtwr-location-consent", "granted");
        setHasLocationPermission(true);
        setLocationMessage("Using your current location for weather data.");
        requestGeolocation();
        return;
      }

      localStorage.setItem("wtwr-location-consent", "denied");
      setHasLocationPermission(false);
      setLocationMessage(
        "Location permission declined. Showing default weather location.",
      );
      fetchAndSetWeather(defaultCoordinates);
    },
    [fetchAndSetWeather, requestGeolocation],
  );

  // Fetch weather data on mount (ask user for location permission)
  useEffect(() => {
    if (hasRequestedLocation.current) {
      return;
    }

    const storedConsent = localStorage.getItem("wtwr-location-consent");

    if (storedConsent === "granted") {
      handleLocationDecision("granted");
      return;
    }

    if (storedConsent === "denied") {
      handleLocationDecision("denied");
      return;
    }

    setShowLocationPrompt(true);
    setLocationMessage(
      "Would you like to share your location for local weather?",
    );
  }, [handleLocationDecision]);

  // Auto-clear location message after 15 seconds for clean UI
  useEffect(() => {
    if (!locationMessage) return;

    const timeoutId = setTimeout(() => {
      setLocationMessage("");
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, [locationMessage]);

  // Auto-clear the status banner after 15 seconds
  useEffect(() => {
    if (hasLocationPermission === null) return;

    setShowLocationStatus(true);
    const timeoutId = setTimeout(() => {
      setShowLocationStatus(false);
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, [hasLocationPermission]);

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
          <button onClick={refetch}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {locationMessage && (
        <div className="page__location-message">{locationMessage}</div>
      )}

      {hasLocationPermission !== null &&
        !showLocationPrompt &&
        showLocationStatus && (
          <div className="page__location-status">
            {hasLocationPermission
              ? "Location permission granted"
              : "Using default location settings"}
          </div>
        )}

      {showLocationPrompt && (
        <div
          className="page__location-prompt-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="page__location-prompt">
            <p>Would you like to share your location to get local weather?</p>
            <div className="page__location-prompt-actions">
              <button onClick={() => handleLocationDecision("granted")}>
                Yes
              </button>
              <button onClick={() => handleLocationDecision("denied")}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

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
          isLoading={isLoading}
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
