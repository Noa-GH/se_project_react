// import "./SideBar.css";

function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt={`${currentUser.name}'s avatar`}
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
