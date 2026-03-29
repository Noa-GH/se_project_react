import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onClose, isLoading }) {
  return (
    <ModalWithForm
      title="New Garment"
      name="add-item"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onAddItem}
      isLoading={isLoading}
    >
      {/* Form fields will be inserted here */}
    </ModalWithForm>
  );
}

export default AddItemModal;
