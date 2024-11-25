import "./DrawerTab.css";
import ToggleButton from "../togglebutton/ToggleButton";
import MapSummary from "../mapsummary/MapSummary";

function DrawerTab({ toggleCollapse }) {
  return (
    <div className="DrawerTab" id="drawer-tab">
      <div className="SummaryContainer SummaryContainer-left">
        <MapSummary isLeftPanel={true}>Zaun</MapSummary>
      </div>

      <ToggleButton onClick={toggleCollapse}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ToggleButton>

      <div className={"SummaryContainer SummaryContainer-right"}>
        <MapSummary isLeftPanel={false}>4-18 !3</MapSummary>
      </div>
    </div>
  );
}

export default DrawerTab;
