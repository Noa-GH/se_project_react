import "./Profile.css";
import SideBar from "./SideBar/SideBar.jsx";
import ClothesSection from "./ClothesSection/ClothesSection.jsx";

function Profile({ clothingItems, onCardClick, handleAddClick, currentUser }) {
  return (
    <div className="profile">
      <SideBar currentUser={currentUser} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
