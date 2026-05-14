import "./App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeatherData } from "../../utils/api";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useState, useEffect } from "react";
import useClothingItems from "../../hooks/useClothingItems";
import * as api from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";

function App() {
  // ── Weather state ────────────
  const [weatherData, setWeatherData] = useState({
    temperature: { F: 75, C: 24 },
    city: "",
    condition: "",
    image: "",
  });

  // ── Modal state ───────────────────────────────────────────────────────────
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);

  // ── Temperature unit ──────────────────────────────────────────────────────
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ── Auth state ────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ── Clothing items hook ───────────────────────────────────────────────────
  const {
    clothingItems,
    isLoading,
    error,
    handleAddItem,
    handleDeleteItem,
    updateClothingItem,
    refetch,
  } = useClothingItems();

  // ── Temperature toggle ────────────────────────────────────────────────────
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // ── Modal handlers ────────────────────
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

  function handleCancelDelete() {
    setCardToDelete(null);
    setActiveModal("preview");
  }

  // ── New modal open handlers ───────────────────────────────────────────────
  function handleOpenRegisterModal() {
    setActiveModal("register");
  }

  function handleOpenLoginModal() {
    setActiveModal("login");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile");
  }

  // ── Item handlers (now pass token — same success/error return) ──────
  async function handleAddGarment(data) {
    const token = localStorage.getItem("jwt");
    const result = await handleAddItem(data, token);
    if (result.success) {
      handleCloseModal();
    } else {
      console.error("Failed to add garment:", result.error);
    }
  }

  async function handleDeleteGarment(id) {
    const token = localStorage.getItem("jwt");
    try {
      const result = await handleDeleteItem(id, token);
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

  // ── Auth handlers ─────────────────────────────────────────────────────────
  function handleRegister({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleUpdateUser({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    api
      .updateCurrentUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  }

  // ── Like / unlike ─────────────────────────────────────────────────────────
  function handleCardLike(item) {
    console.log("handCardLike item:", item);

    console.log("item._id:", item._id, "item.id:", item.id);

    if (!isLoggedIn || !currentUser) return;

    const token = localStorage.getItem("jwt");

    // likes[] may contain string IDs or populated user objects — handle both
    const isLiked = (item.likes || []).some((likeEntry) => {
      const likeId = typeof likeEntry === "string" ? likeEntry : likeEntry._id;
      return likeId === currentUser._id;
    });

    const itemId = item._id || item.id;
    console.log("itemId resolved:", itemId);
    const request = isLiked
      ? api.removeCardLike(itemId, token)
      : api.addCardLike(itemId, token);

    request
      .then((updatedCard) => updateClothingItem(updatedCard))
      .catch(console.error);
  }

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!activeModal) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") handleCloseModal();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

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

  // Check stored JWT on page load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          {isLoading && clothingItems.length === 0 ? (
            <div className="page__loading">Loading clothing items...</div>
          ) : error && clothingItems.length === 0 ? (
            <div className="page__error">
              Error: {error}
              <button onClick={refetch}>Try Again</button>
            </div>
          ) : (
            <>
              <div className="page__content">
                <Header
                  onAddClothesClick={handleOpenAddClothesModal}
                  weatherData={weatherData}
                  isLoggedIn={isLoggedIn}
                  onRegisterClick={handleOpenRegisterModal}
                  onLoginClick={handleOpenLoginModal}
                />

                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        weatherData={weatherData}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onCardLike={handleCardLike}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          clothingItems={clothingItems}
                          onCardClick={handleCardClick}
                          handleAddClick={handleOpenAddClothesModal}
                          onEditProfile={handleOpenEditProfileModal}
                          onSignOut={handleSignOut}
                          onCardLike={handleCardLike}
                        />
                      </ProtectedRoute>
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
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={handleCloseModal}
                onRegister={handleRegister}
              />
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={handleCloseModal}
                onLogin={handleLogin}
              />
              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={handleCloseModal}
                onUpdateUser={handleUpdateUser}
              />
            </>
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
