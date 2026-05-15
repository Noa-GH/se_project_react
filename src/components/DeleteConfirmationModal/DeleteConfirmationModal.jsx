import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/icons/Close-button_dark.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_delete-confirmation ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_delete-confirmation">
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close confirmation modal"
        >
          <img src={closeButton} alt="Close modal" />
        </button>

        <h2 className="modal__confirm-title">
          Are you sure you want to delete{" "}
          {itemName ? `"${itemName}"` : "this item"}?
        </h2>

        <div className="modal__confirm-actions">
          <button
            className="modal__confirm-btn modal__confirm-btn_type_delete"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__confirm-btn modal__confirm-btn_type_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
