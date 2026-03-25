// import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
// import ClothingItem from "../../../utils/types"; // Import the shared interface

// const [ clothingItems, setClothingItems ] = useState([]);

interface ClothingItem {
  id: string;
  name: string;
  imageUrl?: string;
  weather: string;
}

interface ClothesSectionProps {
  clothingItems: ClothingItem[];
  onCardClick: (card: ClothingItem) => void;
  handleAddClick: () => void;
}

function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}: ClothesSectionProps) {
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
        {clothingItems?.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
            onDeleteClick={undefined}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
