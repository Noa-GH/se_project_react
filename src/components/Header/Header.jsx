import "./Header.css";
import ToggleSwitch from "../ToggleSwitch.jsx";
import logo from "../../assets/icons/logo/Logo.svg";
import { Link } from "react-router-dom";

const currentDate = new Date().toLocaleDateString("default", {
  day: "numeric",
  month: "long",
});

function Header({
  onAddClothesClick,
  weatherData,
  toggleSwitch,
  onToggleSwitch,
  currentUser,
}) {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="WTWR logo" />
        </Link>
      </div>
      <div className="header__info">
        <p className="header__info-text">{currentDate},</p>
        <p className="header__info-text">{weatherData.city}</p>
      </div>
      <div className="header__nav">
        <ToggleSwitch isOn={toggleSwitch} onToggle={onToggleSwitch} />
        <button className="header__nav-button" onClick={onAddClothesClick}>
          + Add Clothes
        </button>
      </div>
      <Link to="/profile" className="header__profile">
        <p className="header__profile-username">{currentUser.name}</p>
        <img src={currentUser.avatar} alt={`${currentUser.name}'s avatar`} />
      </Link>
    </header>
  );
}

export default Header;
