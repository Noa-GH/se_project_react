// validationSchema.js
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
  imageUrl: {
    id: "imageUrl",
    name: "imageUrl",
    type: "url",
    placeholder: "Image URL",
    required: true,
    label: "Image URL",
    errorMessages: {
      required: "Image URL is required",
      invalid: "Please enter a valid URL",
    },
  },
  weather: {
    id: "weather",
    name: "weather",
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

export const getErrorMessage = (fieldName, errorType = "invalid") => {
  const schema = fieldSchemas[fieldName];
  if (!schema) return "Invalid input";
  return schema.errorMessages[errorType] || schema.errorMessages.invalid;
};