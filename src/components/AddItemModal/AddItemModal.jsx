import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  return (
    <ModalWithForm
      title="New Garment"
      name="add-item"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onAddItem}
    >
      {/* Form fields will be inserted here */}
    </ModalWithForm>
  );
}

export default AddItemModal;
