import { useState } from "react";
import Map from "./map/Map";
import ToggleButton from "./togglebutton/ToggleButton";
import MapSummary from "./mapsummary/MapSummary";
import DrawerTab from "./drawertab/DrawerTab";
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
      <div className="MapDrawer-tab">
        <DrawerTab toggleCollapse={toggleCollapse}/>
      </div>
    </div>
  );
}

export default MapDrawer;
