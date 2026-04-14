import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteClick = null }) {
  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {onDeleteClick && (
          <button
            className="item-card__delete-btn"
            type="button"
            onClick={() => onDeleteClick(item.id)}
          >
            Delete
          </button>
        )}
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
