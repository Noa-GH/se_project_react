import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // likes[] may contain string IDs or populated user objects — handle both
  const isLiked = item.likes?.some((likeEntry) => {
    const likeId = typeof likeEntry === "string" ? likeEntry : likeEntry._id;
    return likeId === currentUser?._id;
  });

  const likeButtonClassName = `item-card__like-btn ${
    isLiked ? "item-card__like-btn_active" : ""
  }`;

  function handleLike(e) {
    e.stopPropagation();
    onCardLike?.(item);
  }

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>

        {/* Like button — only rendered for logged-in users */}
        {currentUser && (
          <button
            className={likeButtonClassName}
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          />
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
