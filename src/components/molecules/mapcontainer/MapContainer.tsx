import React, { CSSProperties, useRef } from "react";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import MapPin from "../../atoms/mappin/MapPin";
import "./MapContainer.css";

interface MapContainerProps {
  backgroundImage: string;
  locations: { name: string; description: string; x: number; y: number }[];
}

const wrapperStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const contentStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const MapContainer: React.FC<MapContainerProps> = ({
  backgroundImage,
  locations,
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const zoomToElement = (id: string) => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement(id);
    }
  };

  return (
    <div className="MapContainer">
      <TransformWrapper
        initialScale={1.2}
        centerOnInit={true}
        limitToBounds={true}
        ref={transformComponentRef}
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
                  locationDescription={location.description}
                  style={{
                    position: "absolute",
                    left: `${Math.min(location.x, 100)}%`,
                    top: `${Math.min(location.y, 100)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  zoomToElement={zoomToElement}
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
