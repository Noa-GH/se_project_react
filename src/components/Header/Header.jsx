import "./Header.css";
import logo from "../../assets/icons/logo/Logo.svg";
import avatar from "../../assets/icons/avatar-icons/AviPlaceholderTrue.svg";
const currentDate = new Date().toLocaleDateString("default", {
  day: "numeric",
  month: "long",
});

const city = "New York";
const user = "Noah";

function Header({ onAddClothesClick }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Site logo-icon" />
      </div>
      <div className="header__info">
        <p className="header__info-text">{currentDate},</p>
        <p className="header__info-text">{city}</p>
      </div>
      <div className="header__nav">
        <button className="header__nav-button" onClick={onAddClothesClick}>
          + Add Clothes
        </button>
      </div>
      <div className="header__avatar">
        <p className="header__avatar-user_text">{user}</p>
        <img src={avatar} alt="Avatar-icon" />
      </div>
    </header>
  );
}

export default Header;
