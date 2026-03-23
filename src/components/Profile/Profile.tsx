import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

interface ClothingItem {
  _id: number;
  name: string;
  imageUrl?: string;
  weather: string;
}

interface User {
  name: string;
  avatar: string;
}

interface ProfileProps {
  clothingItems: ClothingItem[];
  onCardClick: (card: ClothingItem) => void;
  handleAddClick: () => void;
  currentUser: User;
}

function Profile({ clothingItems, onCardClick, handleAddClick, currentUser }: ProfileProps) {
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