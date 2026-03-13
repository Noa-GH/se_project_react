// validationUtils.js - Input validation utilities for form validation
// This module provides helper functions to validate inputs and manage validation states
// Designed to be extensible for custom validators

import { fieldSchemas, customValidators } from "./validationSchema";

/**
 * Validates a single input element
 * @param {HTMLElement} input - The input element to validate
 * @returns {object} Validation result { isValid, errorMessage }
 */
export const validateInput = (input) => {
  if (!input) {
    return { isValid: false, errorMessage: "Input element not found" };
  }

  const fieldName = input.name;
  const schema = fieldSchemas[fieldName];

  // Check HTML5 validity first
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      return {
        isValid: false,
        errorMessage:
          schema?.errorMessages?.required || schema?.label + " is required",
      };
    }
    if (input.validity.typeMismatch) {
      return {
        isValid: false,
        errorMessage: schema?.errorMessages?.invalid || "Invalid input format",
      };
    }
    return {
      isValid: false,
      errorMessage:
        input.validationMessage ||
        schema?.errorMessages?.invalid ||
        "Invalid input",
    };
  }

  // Run custom validators if defined
  if (schema?.customValidator) {
    const customValidator = customValidators[schema.customValidator];
    if (customValidator && !customValidator(input.value)) {
      return {
        isValid: false,
        errorMessage: schema?.errorMessages?.invalid || "Invalid input format",
      };
    }
  }

  return { isValid: true, errorMessage: "" };
};

/**
 * Gets all inputs in a form
 * @param {HTMLElement} form - The form element
 * @returns {array} Array of input elements
 */
export const getFormInputs = (form) => {
  if (!form) return [];
  return Array.from(
    form.querySelectorAll(".modal__input, .modal__radio-button"),
  );
};

/**
 * Validates all inputs in a form
 * @param {HTMLElement} form - The form element
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateForm = (form) => {
  const inputs = getFormInputs(form);
  const errors = {};
  let isValid = true;

  inputs.forEach((input) => {
    const validation = validateInput(input);
    if (!validation.isValid) {
      isValid = false;
      errors[input.name] = validation.errorMessage;
    }
  });

  return { isValid, errors };
};

/**
 * Shows validation error for an input
 * @param {HTMLElement} input - The input element
 * @param {string} errorMessage - The error message to display
 */
export const showValidationError = (input, errorMessage = "") => {
  if (!input) return;

  // Add error class to input
  input.classList.add("modal__input_type_error");

  // Find and update error message element
  const errorElement = document.getElementById(input.id + "-error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__error_visible");
  }
};

/**
 * Clears validation error for an input
 * @param {HTMLElement} input - The input element
 */
export const clearValidationError = (input) => {
  if (!input) return;

  // Remove error class from input
  input.classList.remove("modal__input_type_error");

  // Clear error message element
  const errorElement = document.getElementById(input.id + "-error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("modal__error_visible");
  }
};

/**
 * Resets all validation errors in a form
 * @param {HTMLElement} form - The form element
 */
export const resetFormValidation = (form) => {
  if (!form) return;

  const inputs = getFormInputs(form);
  inputs.forEach((input) => {
    clearValidationError(input);
  });
};
