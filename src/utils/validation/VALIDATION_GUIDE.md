# Form Validation System Documentation

## Overview

The form validation system is designed to be **modular, extensible, and easy to modify**. It's built with three main layers:

1. **Validation Schema** (`validationSchema.js`) - Field definitions and rules
2. **Component Logic** (`ModalWithForm.jsx`) - React component using validation
3. **Utility Functions** (`validationUtils.js`) - Reusable validation helpers
4. **Styling** (`ModalWithForm.css`) - Error state styling

---

## File Structure

```
src/utils/validation/
├── validation.js              # Legacy validation module (if still needed)
├── validationSchema.js        # Field definitions and rules
├── validationUtils.js         # Validation helper functions
└── validation.css             # Validation error styling
```

---

## How to Modify and Extend

### 1. Adding or Modifying Fields

Edit `validationSchema.js` in the `fieldSchemas` object:

```javascript
export const fieldSchemas = {
  newField: {
    id: "new-field",
    name: "new-field",
    type: "text",
    placeholder: "Enter text",
    required: true,
    minLength: 2,
    maxLength: 50,
    label: "New Field",
    errorMessages: {
      required: "This field is required",
      invalid: "Please enter a valid value",
    },
  },
};
```

**Key properties:**

- `id`: HTML element ID
- `name`: Form field name
- `type`: Input type (text, email, url, number, radio, etc.)
- `required`: Boolean - whether field is required
- `minLength`/`maxLength`: String length constraints
- `placeholder`: Helper text
- `label`: Display label for the field
- `errorMessages`: Custom error messages for different validation errors

### 2. Adding Custom Validators

Add new validators to `customValidators` in `validationSchema.js`:

```javascript
export const customValidators = {
  phoneNumber: (value) => /^\d{3}-\d{3}-\d{4}$/.test(value),
  username: (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value),
};
```

Then reference the validator in your field schema:

```javascript
email: {
  // ... other properties
  type: "email",
  customValidator: "phoneNumber", // references the custom validator above
}
```

### 3. Styling Error States

Error styling is in `ModalWithForm.css`:

**For input errors:**

```css
.modal__input_type_error {
  border-bottom-color: #dc3545; /* Red border */
  background-color: rgba(220, 53, 69, 0.05); /* Light red background */
}
```

**For error messages:**

```css
.modal__error {
  color: #dc3545; /* Red text */
  font-size: 12px;
  margin-top: 2px;
}

.modal__error_visible {
  display: block;
}
```

**To change colors globally:**

- Replace `#dc3545` with your error color
- Replace `#007bff` for focus/active states

### 4. Modifying Button States

The submit button has two disabled states:

**CSS classes:**

- `modal__submit-button_disabled` - Disabled due to form invalid
- `.modal__submit-btn:disabled` - HTML disabled attribute

**To change disabled button appearance:**

```css
.modal__submit-btn:disabled {
  opacity: 0.5; /* Make it appear faded */
  cursor: not-allowed; /* Show "not-allowed" cursor */
}
```

---

## Component Integration

### Using ModalWithForm in Parent Components

```jsx
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalWithForm
      title="Add New Item"
      name="add-item"
      buttonText="Add Item"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      {/* Optional additional fields */}
    </ModalWithForm>
  );
}
```

### Handling Form Submission

Currently, form submission is prevented by the component. To handle submission:

1. Add an `onSubmit` prop to ModalWithForm
2. Update the `handleSubmit` function in ModalWithForm.jsx:

```javascript
function handleSubmit(e) {
  e.preventDefault();
  if (!isFormValid) return;

  // Get form data
  const formData = new FormData(formRef.current);
  const data = Object.fromEntries(formData);

  // Call parent's submit handler
  if (onSubmit) {
    onSubmit(data);
  }
}
```

---

## Validation Flow

```
User types in input
    ↓
useEffect listener triggers (input/change event)
    ↓
validateForm() checks all inputs
    ↓
HTML5 validation via input.validity.valid
    ↓
setIsFormValid(true/false)
    ↓
Button enables/disables via disabled and CSS class
    ↓
Error display (future enhancement via validateInput utilities)
```

---

## Using Validation Utilities

The `validationUtils.js` module provides helper functions for programmatic validation:

```javascript
import {
  validateInput,
  validateForm,
  showValidationError,
  resetFormValidation,
} from "./utils/validation/validationUtils";

// Validate single input
const result = validateInput(inputElement);
if (!result.isValid) {
  showValidationError(inputElement, result.errorMessage);
}

// Validate entire form
const formValidation = validateForm(formElement);
console.log(formValidation); // { isValid: boolean, errors: object }

// Clear validation errors
resetFormValidation(formElement);
```

---

## Future Enhancements

Potential improvements to the validation system:

1. **Real-time error display** - Show/hide error messages as user types
2. **Async validation** - Validate against server (e.g., username availability)
3. **Conditional validation** - Show/hide fields based on other field values
4. **Field dependencies** - One field validates based on another field's value
5. **Multi-step forms** - Validate current step only before moving to next
6. **Internationalization** - Support multiple languages for error messages

---

## Quick Reference

### File Modification Checklist

Add a new field:

- [ ] Add field definition to `validationSchema.js`
- [ ] Add JSX input container in `ModalWithForm.jsx`
- [ ] Add corresponding error message span element
- [ ] (Optional) Add custom validator if needed
- [ ] (Optional) Add CSS styling if needed

Modify validation rules:

- [ ] Edit `fieldSchemas[fieldName]` in `validationSchema.js`
- [ ] Update `errorMessages` object for new error types
- [ ] (Optional) Add custom validator

Change styling:

- [ ] Edit `ModalWithForm.css`
- [ ] Update color values (`#dc3545`, `#007bff`, etc.)
- [ ] Update spacing or typography if needed

---

## Support

For questions or issues:

1. Check the field schema in `validationSchema.js`
2. Verify CSS classes match in `ModalWithForm.css`
3. Check that input IDs match error message element IDs (inputId-error pattern)
4. Review the validation utilities in `validationUtils.js`
