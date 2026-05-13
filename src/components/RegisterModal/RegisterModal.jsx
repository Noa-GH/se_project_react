import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
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

      <label className="modal__label">
        Email *
        <input
          className="modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Password *
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </label>

      <p className="modal__alt-text">
        or{" "}
        <button
          type="button"
          className="modal__alt-link"
          onClick={onClose}
        >
          Log In
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
