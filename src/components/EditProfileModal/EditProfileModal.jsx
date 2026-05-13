import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Pre-fill fields whenever the modal opens or currentUser changes.
  // The dependency on `isOpen` ensures fields reset if the user cancels
  // and re-opens the modal.
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  // Don't crash if currentUser hasn't loaded yet
  if (!currentUser) return null;

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={30}
        />
      </label>

      <label className="modal__label">
        Avatar URL *
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
