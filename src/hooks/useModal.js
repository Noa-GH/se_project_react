// src/hooks/useModal.js
import {useState} from "react";

export function useModal() {
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState(null);

    const openModal = (modalName, card = null) => {
        setActiveModal(modalName);
        setSelectedCard(card);
    };

    const closeModal = () => {
        setActiveModal("");
        setSelectedCard(null);
    };

    return { activeModal, selectedCard, openModal, closeModal };
}

