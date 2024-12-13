import React, { CSSProperties, useState } from "react";
import { KeepScale } from "react-zoom-pan-pinch";
import Tooltip from "../tooltip/Tooltip";
import "./MapPin.css";

interface MapPinProps {
  locationName: string;
  locationDescription: string;
  style?: CSSProperties;
  zoomToElement: (id: string) => void;
}

const MapPin: React.FC<MapPinProps> = ({
  locationName,
  locationDescription = "No description available.",
  style,
  zoomToElement,
}) => {
  const [isTooltipExpanded, setIsTooltipExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipExpanded(false);
  };

  const handleClick = () => {
    if (!isTooltipExpanded) {
      setIsTooltipExpanded(true);
    }
    zoomToElement(`MapPin-${locationName}`);
  };

  const handleCollapse = () => {
    setIsTooltipExpanded(false);
  };

  return (
    <div className="MapPin" style={style}>
      <KeepScale>
        <div
          id={`MapPin-${locationName}`}
          className="MapPin-pin"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Tooltip isExpanded={isTooltipExpanded} onCollapse={handleCollapse}>
            {locationDescription}
          </Tooltip>
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>node_1</title>
            <path
              d="M24,4,7,16V32L24,44,41,32V16ZM37,29.9,24,39.1,11,29.9V18.1L24,8.9l13,9.2Z"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="5"
            />
          </svg>
          <p className="Location-name">{locationName}</p>
        </div>
      </KeepScale>
    </div>
  );
};

export default MapPin;