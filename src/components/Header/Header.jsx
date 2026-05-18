import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import "./Header.css";
import logo from "../../assets/icons/logo/Logo.svg";

function Header({
  weatherData,
  isLoggedIn,
  onAddClothesClick,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
  });

  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <header className="header">
      {/* Left side — logo + date/city (unchanged from your original) */}
      <Link to="/" className="header__logo">
        <img src={logo} alt="WTWR logo" className="header__logo-img" />
      </Link>

      <div className="header__info">
        <p className="header__info-text">
          {currentDate}, {weatherData?.city || ""}
        </p>
      </div>

      {/* Right side — nav changes based on login state */}
      <nav className="header__nav">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="header__nav-button"
              type="button"
              onClick={onAddClothesClick}
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__profile">
              <p className="header__profile-username">{currentUser?.name}</p>

              {currentUser?.avatar ? (
                <img
                  className="header__profile-img"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}

              {/* Placeholder circle with first initial */}
              <div
                className="header__profile-img header__profile-img_placeholder"
                style={{ display: currentUser?.avatar ? "none" : "flex" }}
              >
                {userInitial}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              className="header__nav-button"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__nav-button"
              type="button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
