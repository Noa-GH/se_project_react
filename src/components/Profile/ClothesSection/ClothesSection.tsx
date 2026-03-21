import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

interface ClothingItem {
  _id: number;
  name: string;
  imageUrl?: string;
  weather: string;
}

interface ClothesSectionProps {
  clothingItems: ClothingItem[];
  onCardClick: (card: ClothingItem) => void;
  handleAddClick: () => void;
  handleDeleteItem: (id: number) => void;
}

function ClothesSection({ clothingItems, onCardClick, handleAddClick, handleDeleteItem }: ClothesSectionProps) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onDeleteClick={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
