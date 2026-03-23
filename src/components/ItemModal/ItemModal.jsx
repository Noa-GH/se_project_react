import "./ItemModal.css";
import closeButtonLight from "../../assets/icons/Close-button_light.svg";

function ItemModal({ isOpen, onClose, selectedCard, onDeleteClick }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // Prefer the dark close icon for better visibility over item images.
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
          <button
            className="modal__delete-btn"
            type="button"
            onClick={() => onDeleteClick(selectedCard._id)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
