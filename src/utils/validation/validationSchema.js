// validationSchema.js - Field validation schema definitions
// This module defines validation rules for different fields
// Humans can easily modify these rules without changing component logic

export const fieldSchemas = {
  name: {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Name of Garment",
    required: true,
    minLength: 1,
    maxLength: 100,
    label: "Name",
    errorMessages: {
      required: "Name is required",
      invalid: "Please enter a valid name",
    },
  },
  link: {
    id: "link",
    name: "link",
    type: "url",
    placeholder: "Image URL",
    required: true,
    label: "Link",
    errorMessages: {
      required: "Link is required",
      invalid: "Please enter a valid URL",
    },
  },
  weatherType: {
    id: "weather-type",
    name: "weather-type",
    type: "radio",
    required: true,
    label: "Select the weather type",
    options: [
      { value: "hot", label: "Hot" },
      { value: "warm", label: "Warm" },
      { value: "cold", label: "Cold" },
    ],
    errorMessages: {
      required: "Please select a weather type",
    },
  },
};

// ============================================
// VALIDATION RULES
// ============================================

// Custom validators can be added here
export const customValidators = {
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  nonEmpty: (value) => value.trim().length > 0,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get validation attributes for a field
 * @param {string} fieldName - Name of the field
 * @returns {object} Validation attributes for the field
 */
export const getFieldValidationAttrs = (fieldName) => {
  const schema = fieldSchemas[fieldName];
  if (!schema) return {};

  const attrs = {
    id: schema.id,
    name: schema.name,
    type: schema.type,
    placeholder: schema.placeholder,
  };

  if (schema.required) attrs.required = true;
  if (schema.minLength) attrs.minLength = schema.minLength;
  if (schema.maxLength) attrs.maxLength = schema.maxLength;

  return attrs;
};

/**
 * Get error message for a field validation error
 * @param {string} fieldName - Name of the field
 * @param {string} errorType - Type of error (required, invalid, etc.)
 * @returns {string} Error message
 */
export const getErrorMessage = (fieldName, errorType = "invalid") => {
  const schema = fieldSchemas[fieldName];
  if (!schema) return "Invalid input";
  return schema.errorMessages[errorType] || schema.errorMessages.invalid;
};
