import { useState, useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

import DegC from "./DegreeToggleBtn/DegC.svg";
import DegF from "./DegreeToggleBtn/DegF.svg";
import DegHover from "./DegreeToggleBtn/DegHover.svg";
import DegMove from "./DegreeToggleBtn/DegMove.svg";

interface ToggleSwitchProps {
  label?: string;
  disabled?: boolean;
}

function ToggleSwitch({ label, disabled = false }: ToggleSwitchProps) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  // isOn is true when the unit is Celsius (switch toggled on)
  const isOn = currentTemperatureUnit === "C";
  const [isHovered, setIsHovered] = useState(false);

  // Select the correct image based on state and hover
  const getCurrentImage = () => {
    if (isOn) {
      return isHovered ? DegHover : DegC;
    } else {
      return isHovered ? DegMove : DegF;
    }
  };

  return (
    <div className="toggle-container">
      {label && <span className="toggle-label">{label}</span>}
      <label className="switch">
        <input
          type="checkbox"
          checked={isOn}
          onChange={handleToggleSwitchChange}
          disabled={disabled}
        />
        <span
          className="slider-image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={getCurrentImage()}
            alt={isOn ? "Switch is on (C)" : "Switch is off (F)"}
            className="switch-image"
          />
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitch;