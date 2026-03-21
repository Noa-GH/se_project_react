import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteClick }) {
  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {onDeleteClick && (
          <button
            className="item-card__delete-btn"
            type="button"
            onClick={() => onDeleteClick(item._id)}
          >
            Delete
          </button>
        )}
      </div>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
