import { useState } from "react";
import closeButton from "../../assets/icons/Close-button_dark.svg";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = name && avatar && email && password.length >= 8;

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className={`modal modal_type_register ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">Sign Up</h2>
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img src={closeButton} alt="Close modal" />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label className="modal__label" htmlFor="register-email">
              Email *
            </label>
            <input
              id="register-email"
              className="modal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="register-password">
              Password *
            </label>
            <input
              id="register-password"
              className="modal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="register-name">
              Name *
            </label>
            <input
              id="register-name"
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
            <label className="modal__label" htmlFor="register-avatar">
              Avatar URL *
            </label>
            <input
              id="register-avatar"
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
            Sign Up
          </button>

          <p className="modal__alt-text">
            or{" "}
            <button type="button" className="modal__alt-link" onClick={onClose}>
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
