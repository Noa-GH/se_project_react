import "./ModalWithForm.css";
import { useState, useRef, useEffect } from "react";
import closeButton from "../../assets/icons/Close-button_dark.svg";
import { fieldSchemas } from "../../utils/validation/validationSchema";
import {
  validateInput,
  showValidationError,
  clearValidationError,
} from "../../utils/validation/validationUtils";

function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  // Validate form on mount and when inputs change
  useEffect(() => {
    if (!formRef.current || !isOpen) return;

    const validateForm = () => {
      const inputs = formRef.current.querySelectorAll(
        ".modal__input, .modal__radio-button",
      );
      let isValid = true;

      inputs.forEach((input) => {
        const validation = validateInput(input);

        if (!validation.isValid) {
          isValid = false;
          showValidationError(input, validation.errorMessage);
        } else {
          clearValidationError(input);
        }
      });

      setIsFormValid(isValid);
    };

    // Initial validation
    validateForm();

    // Add listeners to all inputs
    const inputs = formRef.current.querySelectorAll(
      ".modal__input, .modal__radio-button",
    );
    inputs.forEach((input) => {
      input.addEventListener("input", validateForm);
      input.addEventListener("change", validateForm);
      input.addEventListener("blur", validateForm);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", validateForm);
        input.removeEventListener("change", validateForm);
        input.removeEventListener("blur", validateForm);
      });
    };
  }, [isOpen]);

  // Close when the overlay (modal backdrop) is clicked, but not the inner content
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    // Collect form data
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    // Call parent's submit handler if provided
    if (onSubmit) {
      onSubmit(data);
    }

    // Reset form
    formRef.current.reset();
    setIsFormValid(false);
  }

  // Debug logging (commented out for production)
  // console.log('fieldSchemas.imageUrl:', fieldSchemas.imageUrl);
  // console.log('label:', fieldSchemas.imageUrl?.label);

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
        <form
          className="modal__form"
          name={name}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {children}

          {/* Name Input Field */}
          <div className="modal__field">
            <label className="modal__label" htmlFor="name">
              {fieldSchemas.name.label}
            </label>
            <input
              id="name"
              className="modal__input"
              type={fieldSchemas.name.type}
              name={fieldSchemas.name.name}
              placeholder={fieldSchemas.name.placeholder}
              required={fieldSchemas.name.required}
              minLength={fieldSchemas.name.minLength}
              maxLength={fieldSchemas.name.maxLength}
            />
            <span
              id="name-error"
              className="modal__error"
              role="alert"
              aria-live="polite"
            ></span>
          </div>

          {/* Image URL Input Field */}
          <div className="modal__field">
            <label className="modal__label" htmlFor="imageUrl">
              {fieldSchemas.imageUrl.label}
            </label>
            <input
              id="imageUrl"
              className="modal__input"
              type={fieldSchemas.imageUrl.type}
              name={fieldSchemas.imageUrl.name}
              placeholder={fieldSchemas.imageUrl.placeholder}
              required={fieldSchemas.imageUrl.required}
            />
            <span
              id="imageUrl-error"
              className="modal__error"
              role="alert"
              aria-live="polite"
            ></span>
          </div>

          {/* Weather Type Radio Buttons */}
          <fieldset className="modal__radio-buttons">
            <legend className="modal__radio-buttons-legend">
              {fieldSchemas.weather.label}
            </legend>
            {fieldSchemas.weather.options.map((option) => (
              <div key={option.value} className="modal__radio-button-container">
                <input
                  id={`${option.value}-radio`}
                  className="modal__radio-button"
                  type="radio"
                  name={fieldSchemas.weather.name}
                  value={option.value}
                  required={fieldSchemas.weather.required}
                />
                <label
                  className="modal__radio-button-label"
                  htmlFor={`${option.value}-radio`}
                >
                  {option.label}
                </label>
              </div>
            ))}
            <span
              id="weather-error"
              className="modal__error"
              role="alert"
              aria-live="polite"
            ></span>
          </fieldset>

          {/* Submit Button - Disabled when form is invalid */}
          <button
            className={`modal__submit-btn modal__submit-button ${!isFormValid ? "modal__submit-button_disabled" : ""
              }`}
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;