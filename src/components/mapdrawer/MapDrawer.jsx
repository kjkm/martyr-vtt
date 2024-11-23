import { useState } from "react";
import Map from "../map/Map";
import ToggleButton from "../atoms/togglebutton/ToggleButton";
import "./MapDrawer.css";

function MapDrawer() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`MapDrawer ${isCollapsed ? "MapDrawer-collapsed" : ""}`}>
      <div className="MapDrawer-container">
        <Map />
      </div>
      <ToggleButton onClick={toggleCollapse}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ToggleButton>
    </div>
  );
}

export default MapDrawer;
