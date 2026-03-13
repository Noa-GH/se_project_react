# Form Validation System Architecture

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INTERACTION                            │
│               (Type in input, fill form, click button)          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  ModalWithForm.jsx (React)                      │
│                                                                 │
│  • Listens to input/change events                               │
│  • Calls validateForm() on each event                           │
│  • Manages form validity state via useState                     │
│  • Updates button disabled attribute based on state             │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
   ┌─────────┐    ┌────────────┐    ┌──────────────┐
   │ Validates│   │ Gets field │    │ Applies CSS  │
   │all inputs│   │ definitions│    │ classes to   │
   │via HTML5 │   │  from      │    │ button  &    │
   │validity  │   │ fieldSchema│    │ input states │
   └────┬────┘    └────┬───────┘    └──────┬───────┘
        │              │                   │
        │              ↓                   │
        │         ┌──────────────────┐     │
        │         │validationSchema.js│    │
        │         │                  │     │
        │         │ fieldSchemas:    │     │
        │         │ - name           │     │
        │         │ - link           │     │
        │         │ - weatherType    │     │
        │         │                  │     │
        │         │ customValidators │     │
        │         └──────────────────┘     │
        │                                  │
        └────────────────┬─────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│           ModalWithForm.css (Styling)                           │
│                                                                 │
│  .modal__input                                                  │
│  .modal__input:focus       → Blue underline                     │
│  .modal__input_type_error  → Red underline & background         │
│  .modal__error_visible     → Show error message                 │
│                                                                 │
│  .modal__submit-btn                                             │
│  .modal__submit-button_disabled → Gray, not-allowed cursor      │
│  :hover:not(:disabled)     → Opacity change                     │
└─────────────────────────────────────────────────────────────────┘
```

## File Dependencies

```
ModalWithForm.jsx
├── Imports validationSchema.js
│   └── fieldSchemas object (field definitions)
│       └── Used to render inputs and labels dynamically
│
├── Uses HTML5 validation
│   └── input.validity.valid (native browser API)
│
├── Applies styles from ModalWithForm.css
│   ├── `modal__submit-button_disabled` (invalid form)
│   ├── `modal__input_type_error` (invalid input)
│   └── `modal__error_visible` (show error)
│
└── Can use validationUtils.js (optional, for future)
    ├── validateInput()
    ├── showValidationError()
    ├── clearValidationError()
    └── resetFormValidation()
```

## State and Props Flow

```
ModalWithForm Component
│
├── Props (from parent)
│   ├── title: string
│   ├── name: string
│   ├── buttonText: string
│   ├── isOpen: boolean
│   └── onClose: function
│
├── State (managed here)
│   ├── isFormValid: boolean ← Updates on input change
│   └── formRef: React ref ← Points to form element
│
├── Effects
│   └── On modal open: Attach event listeners to all inputs
│
└── Output
    ├── Button disabled attribute: {!isFormValid}
    ├── Button CSS class: {!isFormValid ? "disabled" : ""}
    └── Form element with proper structure and labels
```

## Validation State Transitions

```
┌──────────────────┐
│  Form Rendered   │
│  (All fields     │
│   empty)         │
└────────┬─────────┘
         │
         ↓
    ┌──────────────────────┐
    │  isFormValid = false │
    │  Button: DISABLED    │
    │  (opaque, gray)      │
    └────────┬─────────────┘
             │
   User fills in required fields
             │
             ↓
    ┌──────────────────────┐
    │  Input event fires   │
    │  validateForm() runs │
    │  Checks all inputs   │
    └────────┬─────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ↓ (Invalid)       ↓ (Valid)
┌─────────────┐  ┌──────────────────┐
│ Some field  │  │ All fields       │
│ is invalid  │  │ are valid        │
│             │  │                  │
│ Button:     │  │ Button:          │
│ DISABLED    │  │ ENABLED          │
│ (opaque)    │  │ (normal, active) │
└─────────────┘  └──────────────────┘
    ↑                    ↑
    │                    │
 User clears a field  Ready to submit
    │                    │
    └────────────────────┘
           (repeats)
```

## CSS Class Application Logic

```
Form Validation Result
    │
    ├─→ isFormValid = true
    │   └─→ Remove: modal__submit-button_disabled
    │       └─→ Button appears normal (clickable)
    │
    └─→ isFormValid = false
        └─→ Add: modal__submit-button_disabled
            └─→ Button appears disabled (faded, not-allowed cursor)
```

## Input Error Styling Logic

```
Input validation result
    │
    ├─→ Invalid
    │   ├─→ Add class: modal__input_type_error
    │   │   └─→ Red boundary, light red background
    │   └─→ Show error span: modal__error_visible
    │       └─→ Error message displays
    │
    └─→ Valid
        ├─→ Remove: modal__input_type_error
        │   └─→ Normal black boundary
        └─→ Hide error span
            └─→ Error message hidden
```

## Extension Points

```
To add new validation capability:

1. ADD FIELD
   └─→ Edit validationSchema.js
       └─→ Add to fieldSchemas object

2. ADD VALIDATION RULE
   └─→ Edit fieldSchemas[fieldName]
       ├─→ Set required: true/false
       ├─→ Set minLength, maxLength, type
       └─→ Set errorMessages

3. ADD CUSTOM VALIDATOR
   └─→ Edit validationSchema.js
       └─→ Add to customValidators object
           └─→ Reference in fieldSchema via customValidator property

4. CHANGE ERROR STYLING
   └─→ Edit ModalWithForm.css
       └─→ Update .modal__input_type_error
       └─→ Update .modal__error colors

5. CHANGE DISABLED BUTTON STYLING
   └─→ Edit ModalWithForm.css
       └─→ Update .modal__submit-button_disabled
```

---

This architecture ensures:

- **Minimal coupling**: Components don't know about each other's details
- **Maximum flexibility**: Field definitions are data, not code
- **Easy testing**: Validators are pure functions
- **Clear responsibility**: Each file has one job
