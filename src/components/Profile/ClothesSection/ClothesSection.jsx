// import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

// const [ clothingItems, setClothingItems ] = useState([]);

function ClothesSection({ clothingItems, onCardClick, handleAddClick }) {
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
