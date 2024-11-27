import { useState, useEffect, useCallback } from "react";
import Map from "./map/Map";
import DrawerTab from "./drawertab/DrawerTab";
import "./MapDrawer.css";

function MapDrawer() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const modifierKey = "altKey";
      if (event[modifierKey]) {
        switch (event.key.toLowerCase()) {
          case "m":
            toggleCollapse();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleCollapse]);

  return (
    <div className={`MapDrawer ${isCollapsed ? "MapDrawer-collapsed" : ""}`}>
      <div className="MapDrawer-container">
        <Map />
      </div>
      <div className="MapDrawer-tab">
        <DrawerTab toggleCollapse={toggleCollapse} />
      </div>
    </div>
  );
}

export default MapDrawer;