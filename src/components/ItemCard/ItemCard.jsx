import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((likeEntry) => {
    const likeId = typeof likeEntry === "string" ? likeEntry : likeEntry._id;
    return likeId === currentUser?._id;
  });

  const likeButtonClassName = `item-card__like-btn ${isLiked ? "item-card__like-btn_active" : ""};`;

  function handleLike(e) {
    e.stopProagation(); //This doesn't trigger onCardClick
    onCardLike?.(item);
  }

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={likeButtonClassName}
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
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
