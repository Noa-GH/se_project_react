// import './ToggleSwitch.css';
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

const TemperatureToggle = () => {
  // Get unit and setUnit from context instead of local state
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  // Handle the toggle click
  const handleToggle = () => {
    const newUnit = currentTemperatureUnit === "F" ? "C" : "F";
    handleToggleSwitchChange(newUnit);
    // Context automatically updates all components using useTemperature()
  };

  return (
    <div className="temperature-toggle-container">
      <button
        className={`temperature-toggle ${currentTemperatureUnit === "F" ? "is-fahrenheit" : "is-celsius"}`}
        onClick={handleToggle}
        aria-label={`Toggle temperature unit. Currently set to ${currentTemperatureUnit}`}
      >
        {/* The animated circle that moves left/right */}
        <div className="toggle-circle" />

        {/* Labels for each unit */}
        <span className="unit-label unit-f">F</span>
        <span className="unit-label unit-c">C</span>
      </button>
    </div>
  );
};

export default TemperatureToggle;
