import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemModal.css";
import closeButtonLight from "../../assets/icons/Close-button_light.svg";

function ItemModal({ isOpen, onClose, selectedCard, onRequestDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const ownerId =
    typeof selectedCard?.owner === "string"
      ? selectedCard.owner
      : selectedCard?.owner?._id;

  const isOwn = ownerId === currentUser?._id;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const closeButtonIcon = closeButtonLight;

  return (
    <div
      className={`modal modal_type_image ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-btn modal__close-btn_type_image"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeButtonIcon} alt="Close modal" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <p className="modal__caption">{selectedCard.name}</p>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          {isOwn && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={() => onRequestDelete(selectedCard)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
