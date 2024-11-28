import { useState } from "react";
import "./FoundationTracker.css";

function FoundationTracker() {
  const foundationTypes = ["body", "mind", "soul"];
  const initialPoints = { vice: 0, balance: 3, virtue: 0 };

  const labels = {
    body: { vice: "Arrogance", virtue: "Valor" },
    mind: { vice: "Obsession", virtue: "Clarity" },
    soul: { vice: "Delusion", virtue: "Hope" },
  };

  const [points, setPoints] = useState({
    body: { ...initialPoints },
    mind: { ...initialPoints },
    soul: { ...initialPoints },
  });

  const handleArrowClick = (type, direction) => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for 50 milliseconds
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

  const calculateStyle = (points) => {
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

    const backgroundColor =
      points > 0 ? "var(--background-color-lighter)" : "transparent";
    const borderColor =
      points > 0 ? "var(--border-color-dark)" : "var(--border-color-darker)";

    return {
      fontSize: `${clampedFontSize}px`,
      opacity: clampedOpacity,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    };
  };

  return (
    <div className="FoundationTracker">
      {foundationTypes.map((type) => (
        <div className="Foundation-type-panel">
          <div key={type} className="Foundation-type">
            <button
              className="Foundation-arrow Foundation-arrow-up"
              onClick={() => handleArrowClick(type, "up")}
            >
              +
            </button>
            <div
              className="Foundation-zone Foundation-vice"
              style={{
                backgroundColor:
                  points[type].vice > 0
                    ? "var(--background-color-lighter)"
                    : "transparent",
                borderColor:
                  points[type].vice > 0
                    ? "var(--border-color-dark)"
                    : "var(--border-color-darker)",
              }}
            >
              <span
                className="Foundation-value"
                style={calculateStyle(points[type].vice)}
              >
                {points[type].vice > 0 && `-${points[type].vice}`}
              </span>
              <span
                className="Foundation-zone-label"
                style={{
                  color:
                    points[type].vice === 0
                      ? "var(--text-color-darker)"
                      : "var(--text-color-dark)",
                }}
              >
                {labels[type].vice}
              </span>
            </div>
            <div
              className="Foundation-zone Foundation-balance"
              style={{
                backgroundColor:
                  points[type].balance > 0
                    ? "var(--background-color-lighter)"
                    : "transparent",
                borderColor:
                  points[type].balance > 0
                    ? "var(--border-color-dark)"
                    : "var(--border-color-darker)",
              }}
            >
              <span
                className="Foundation-value"
                style={calculateStyle(points[type].balance)}
              >
                {points[type].balance > 0 ? points[type].balance : ""}
              </span>
            </div>
            <div
              className="Foundation-zone Foundation-virtue"
              style={{
                backgroundColor:
                  points[type].virtue > 0
                    ? "var(--background-color-lighter)"
                    : "transparent",
                borderColor:
                  points[type].virtue > 0
                    ? "var(--border-color-dark)"
                    : "var(--border-color-darker)",
              }}
            >
              <span
                className="Foundation-value"
                style={calculateStyle(points[type].virtue)}
              >
                {points[type].virtue > 0 && `+${points[type].virtue}`}
              </span>
              <span
                className="Foundation-zone-label"
                style={{
                  color:
                    points[type].virtue === 0
                      ? "var(--text-color-darker)"
                      : "var(--text-color-dark)",
                }}
              >
                {labels[type].virtue}
              </span>
            </div>
            <button
              className="Foundation-arrow Foundation-arrow-down"
              onClick={() => handleArrowClick(type, "down")}
            >
              -
            </button>
          </div>
          <h2 className="Foundation-label">
            {type.toUpperCase()}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default FoundationTracker;
