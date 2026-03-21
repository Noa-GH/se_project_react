import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: (newUnit) => { },
});

export default CurrentTemperatureUnitContext;