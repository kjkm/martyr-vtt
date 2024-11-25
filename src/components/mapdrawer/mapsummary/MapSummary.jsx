import "./MapSummary.css";

function MapSummary({ isLeftPanel, children }) {
  return (
    <div
      id="map-summary"
      className={
        isLeftPanel
          ? "MapSummary MapSummary-left"
          : "MapSummary MapSummary-right"
      }
    >
      {children}
    </div>
  );
}

export default MapSummary;
