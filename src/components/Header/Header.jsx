import "./Header.css";
import logo from "../../assets/icons/logo/Logo.svg";
import avatar from "../../assets/icons/avatar-icons/AviPlaceholderTrue.svg";
const currentDate = new Date().toLocaleDateString("default", {
  day: "numeric",
  month: "long",
});

const user = "Noah";

function Header({ onAddClothesClick, weatherData }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="WTWR logo" />
      </div>
      <div className="header__info">
        <p className="header__info-text">{currentDate},</p>
        <p className="header__info-text">{weatherData.city}</p>
      </div>
      <div className="header__nav">
        <button className="header__nav-button" onClick={onAddClothesClick}>
          + Add Clothes
        </button>
      </div>
      <div className="header__avatar">
        <p className="header__avatar-user_text">{user}</p>
        <img src={avatar} alt={`${user}'s avatar`} />
      </div>
    </header>
  );
}

export default Header;
