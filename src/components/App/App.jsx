import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({ temp: { F: 75 } });
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

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClothesClick={handleOpenAddClothesModal} />
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
  );
}

export default App;
