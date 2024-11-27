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

  return (
    <div className="FoundationTracker">
      {foundationTypes.map((type) => (
        <div key={type} className="Foundation-type">
          <h3 className="Foundation-label">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <button
            className="Foundation-arrow Foundation-arrow-up"
            onClick={() => handleArrowClick(type, "up")}
          >
            ↑
          </button>
          <div className="Foundation-zone Foundation-vice">
            <span className="Foundation-value">
              {points[type].vice > 0 && `-${points[type].vice}`}
            </span>
            <span className="Foundation-zone-label">{labels[type].vice}</span>
          </div>
          <div className="Foundation-zone Foundation-balance">
            <span className="Foundation-value">
              {points[type].balance > 0 ? points[type].balance : ""}
            </span>
          </div>
          <div className="Foundation-zone Foundation-virtue">
            <span className="Foundation-value">
              {points[type].virtue > 0 && `+${points[type].virtue}`}
            </span>
            <span className="Foundation-zone-label">{labels[type].virtue}</span>
          </div>
          <button
            className="Foundation-arrow Foundation-arrow-down"
            onClick={() => handleArrowClick(type, "down")}
          >
            ↓
          </button>
        </div>
      ))}
    </div>
  );
}

export default FoundationTracker;
