import React, { CSSProperties } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapPin from "../../atoms/mappin/MapPin";
import "./MapContainer.css";

interface Location {
  name: string;
  x: number;
  y: number;
}

interface MapContainerProps {
  backgroundImage: string;
  locations: Location[];
}

const wrapperStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const contentStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const MapContainer: React.FC<MapContainerProps> = ({
  backgroundImage,
  locations,
}) => {
  return (
    <div className="MapContainer">
      <TransformWrapper
        initialScale={1.2}
        centerOnInit={true}
        limitToBounds={true}
      >
        <TransformComponent
          wrapperStyle={wrapperStyle}
          contentStyle={contentStyle}
        >
          <div className="MapContainer-wrapper">
            <div
              className="MapContainer-map"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {locations.map((location, index) => (
                <MapPin
                  key={index}
                  locationName={location.name}
                  style={{
                    position: "absolute",
                    left: `${Math.min(location.x, 100)}%`,
                    top: `${Math.min(location.y, 100)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default MapContainer;
