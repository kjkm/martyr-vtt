import React, { CSSProperties, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import MapPin from "../../atoms/mappin/MapPin";
import { Environment } from "../../../types/types";
import "./MapContainer.css";

interface MapContainerProps {
  environment: Environment;
}

const wrapperStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const contentStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const Overlay: React.FC<{
  environmentName: string;
  onBackClick: () => void;
}> = ({ environmentName, onBackClick }) => (
  <div className="MapNavigator">
    <button className="MapNavigator-button" onClick={onBackClick}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="var(--text-color-lighter)"
          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        />
        <path
          fill="var(--text-color-lighter)"
          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        />
      </svg>
    </button>
    <span className="MapNavigator-environmentName">{environmentName}</span>
    <button className="MapNavigator-button">
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="var(--text-color-lighter)"
        strokeWidth={3}
      >
        <polyline points="16 20 16 8 48 8 48 56 16 56 16 44" />
        <polyline points="28 40 36 32 28 24" />
        <line x1="8" y1="32" x2="36" y2="32" />
      </svg>
    </button>
  </div>
);

const MapContainer: React.FC<MapContainerProps> = ({
  environment,
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const zoomToElement = (id: string) => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement(id);
    }
  };

  const handleBackClick = () => {
    zoomToElement('top-level-map');
  };

  return (
    <div className="MapContainer">
      <Overlay environmentName={environment.name} onBackClick={handleBackClick} />
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
              id="top-level-map"
              className="MapContainer-map"
              style={{ backgroundImage: `url(${environment.backgroundImage})` }}
            >
              {environment.children?.map((location, index) => (
                <MapPin
                  key={index}
                  locationName={location.name}
                  locationDescription={location.description ?? ""}
                  style={{
                    position: "absolute",
                    left: `${Math.min(location.screenPosition?.x ?? 0, 100)}%`,
                    top: `${Math.min(location.screenPosition?.y ?? 0, 100)}%`,
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