import "./ModalWithForm.css";
import closeButton from "../../assets/icons/Close-button.svg";

function ModalWithForm({ title, name, buttonText, isOpen, onClose, children }) {
  // Close when the overlay (modal backdrop) is clicked, but not the inner content
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img src={closeButton} alt="Close modal" />
        </button>
        <form className="modal__form" name={name}>
          {children}

          <div className="modal__name-input">Name</div>
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
          />

          <div className="modal__link-input">Link</div>
          <input
            className="modal__input"
            type="text"
            name="link"
            placeholder="Image URL"
          />

          <fieldset className="modal__radio-buttons">
            <legend className="modal__radio-buttons-legend">
              Select the weather type:
            </legend>
            <div className="modal__radio-button-container">
              <input
                className="modal__radio-button"
                type="radio"
                id="hot-radio"
                name="weather-type"
                value="hot"
              />
              <label className="modal__radio-button-label" htmlFor="hot-radio">
                Hot
              </label>
            </div>
            <div className="modal__radio-button-container">
              <input
                className="modal__radio-button"
                type="radio"
                id="warm-radio"
                name="weather-type"
                value="warm"
              />
              <label className="modal__radio-button-label" htmlFor="warm-radio">
                Warm
              </label>
            </div>
            <div className="modal__radio-button-container">
              <input
                className="modal__radio-button"
                type="radio"
                id="cold-radio"
                name="weather-type"
                value="cold"
              />
              <label className="modal__radio-button-label" htmlFor="cold-radio">
                Cold
              </label>
            </div>
          </fieldset>

          <button className="modal__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

/*
return (
  <div>
    <form className="modal__form" name={name}>
      {children}
      <h2 className="modal__title">{title}</h2>
      <button className="modal__close-btn" type="button" onClick={onClose} />
      <div className="modal__label">Name</div>
      <input id="name-input" type="text" name="name" placeholder="Name" />
      <div className="modal__label">Link</div>
      <input id="link-input" type="text" name="link" placeholder="Image URL" />
      <div className="modal__label">Select the weather type:</div>
      <div className="modal__type-button-container">
        <ul className="modal__type-button-list">
          <li className="modal__type-button-item">
            <button className="modal__type-button" type="button">
              Hot
            </button>
          </li>
          <li className="modal__type-button-item">
            <button className="modal__type-button" type="button">
              Warm
            </button>
          </li>
          <li className="modal__type-button-item">
            <button className="modal__type-button" type="button">
              Cold
            </button>
          </li>
        </ul>
      </div>
      <button className="modal__submit-btn" type="submit">
        {buttonText}
      </button>
    </form>
  </div>
);

*/
