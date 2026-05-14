import { useState, useEffect, useContext } from "react";
import closeButton from "../../assets/icons/Close-button_dark.svg";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Pre-fill fields when modal opens or currentUser changes
  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const isFormValid = name && avatar;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!currentUser) return null;

  return (
    <div
      className={`modal modal_type_edit-profile ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">Change profile data</h2>
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img src={closeButton} alt="Close modal" />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label className="modal__label" htmlFor="edit-name">
              Name *
            </label>
            <input
              id="edit-name"
              className="modal__input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={30}
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="edit-avatar">
              Avatar URL *
            </label>
            <input
              id="edit-avatar"
              className="modal__input"
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </div>

          <button
            className={`modal__submit-btn modal__submit-button ${
              !isFormValid ? "modal__submit-button_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
