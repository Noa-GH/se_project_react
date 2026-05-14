import { useContext, useState } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const [avatarFailed, setAvatarFailed] = useState(false);

  if (!currentUser) return null;

  const userInitial = currentUser?.name?.charAt(0).toUpperCase();
  const showPlaceholder = !currentUser.avatar || avatarFailed;

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {showPlaceholder ? (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {userInitial}
          </div>
        ) : (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
            onError={() => setAvatarFailed(true)}
          />
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="sidebar__actions">
        <button className="sidebar__btn" type="button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__btn" type="button" onClick={onSignOut}>
          Log out
        </button>
      </div>
    </aside>
  );
}
export default SideBar;
