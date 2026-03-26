import "./SideBar.css";

function SideBar({ className, currentUser }) {
  return (
    <div className={className}>
      <div className="sidebar">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <h2 className="sidebar__username">{currentUser.name}</h2>
      </div>
    </div>
  );
}

export default SideBar;
