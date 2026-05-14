import { useState } from "react";
import closeButton from "../../assets/icons/Close-button_dark.svg";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password.length >= 8;

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className={`modal modal_type_login ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">Log In</h2>
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img src={closeButton} alt="Close modal" />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label className="modal__label" htmlFor="login-email">
              Email *
            </label>
            <input
              id="login-email"
              className="modal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="login-password">
              Password *
            </label>
            <input
              id="login-password"
              className="modal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Log In
          </button>

          <p className="modal__alt-text">
            or{" "}
            <button type="button" className="modal__alt-link" onClick={onClose}>
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
