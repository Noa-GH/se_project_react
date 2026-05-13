// ─────────────────────────────────────────────────────────────────────────────
// SideBar.jsx
// Shows avatar (or initial placeholder), user name, Edit Profile, Sign Out.
// ─────────────────────────────────────────────────────────────────────────────

import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) return null;

  const userInitial = currentUser.name?.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {userInitial}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="sidebar__actions">
        <button
          className="sidebar__btn"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          className="sidebar__btn sidebar__btn_type_signout"
          type="button"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
