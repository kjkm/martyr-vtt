import { useState } from "react";
import "./FoundationTracker.css";

interface Points {
  vice: number;
  balance: number;
  virtue: number;
}

interface FoundationPoints {
  body: Points;
  mind: Points;
  soul: Points;
}

const FoundationTracker: React.FC = () => {
  const initialPoints: Points = { vice: 0, balance: 3, virtue: 0 };

  const [points, setPoints] = useState<FoundationPoints>({
    body: { ...initialPoints },
    mind: { ...initialPoints },
    soul: { ...initialPoints },
  });

  const handleArrowClick = (
    type: keyof FoundationPoints,
    direction: "up" | "down"
  ) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setPoints((prevPoints) => {
      const newPoints = { ...prevPoints };

      if (direction === "down") {
        if (newPoints[type].vice > 0) {
          newPoints[type].balance += 1;
          newPoints[type].vice -= 1;
        } else if (newPoints[type].balance > 0) {
          newPoints[type].virtue += 1;
          newPoints[type].balance -= 1;
        }
      } else if (direction === "up") {
        if (newPoints[type].virtue > 0) {
          newPoints[type].balance += 1;
          newPoints[type].virtue -= 1;
        } else if (newPoints[type].balance > 0) {
          newPoints[type].vice += 1;
          newPoints[type].balance -= 1;
        }
      }

      return newPoints;
    });
  };

  const calculateStyle = (points: number) => {
    const baseSize = 16;
    const increment = 3;
    const minSize = 12;
    const maxSize = 26;
    const fontSize = baseSize + points * increment;
    const clampedFontSize = Math.min(Math.max(fontSize, minSize), maxSize);

    const baseOpacity = 0.5;
    const maxOpacity = 1;
    const opacityIncrement = 0.1;
    const opacity = baseOpacity + points * opacityIncrement;
    const clampedOpacity = Math.min(opacity, maxOpacity);

    return {
      fontSize: `${clampedFontSize}px`,
      opacity: clampedOpacity,
    };
  };

  const renderZone = (
    type: keyof FoundationPoints,
    zone: keyof Points,
    label?: string
  ) => {
    const value = points[type][zone];
    const isActive = value > 0;
    const backgroundColor = isActive
      ? "var(--background-color-lighter)"
      : "transparent";
    const borderColor = isActive
      ? "var(--border-color-dark)"
      : "var(--border-color-darker)";
    const textColor =
      value === 0 ? "var(--text-color-darker)" : "var(--text-color-dark)";

    return (
      <div
        className={`Foundation-zone Foundation-${zone}`}
        style={{ backgroundColor, borderColor }}
      >
        <span className="Foundation-value" style={calculateStyle(value)}>
          {isActive &&
            (zone === "vice"
              ? `-${value}`
              : zone === "virtue"
              ? `+${value}`
              : value)}
        </span>
        {label && (
          <span className="Foundation-zone-label" style={{ color: textColor }}>
            {label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="FoundationTracker">
      {Object.keys(points).map((type) => (
        <div key={type} className="Foundation-type-panel">
          <div className="Foundation-type">
            <button
              className="Foundation-arrow Foundation-arrow-up"
              onClick={() =>
                handleArrowClick(type as keyof FoundationPoints, "up")
              }
            >
              +
            </button>
            {renderZone(type as keyof FoundationPoints, "vice", "Vice")}
            {renderZone(type as keyof FoundationPoints, "balance")}
            {renderZone(type as keyof FoundationPoints, "virtue", "Virtue")}
            <button
              className="Foundation-arrow Foundation-arrow-down"
              onClick={() =>
                handleArrowClick(type as keyof FoundationPoints, "down")
              }
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoundationTracker;
