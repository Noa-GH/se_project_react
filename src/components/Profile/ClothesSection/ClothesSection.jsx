import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

// const [ clothingItems, setClothingItems ] = useState([]);

function ClothesSection({ className, clothingItems, onCardClick, handleAddClick }) {
  return (
    <section className={className}>
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your Items</h2>
        <button className="clothes-section__add-btn" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
