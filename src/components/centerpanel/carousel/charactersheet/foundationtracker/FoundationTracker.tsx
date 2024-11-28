import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../state/store";
import "./FoundationTracker.css";
import { Character, setBodyFoundation, setMindFoundation, setSoulFoundation } from "../../../../../state/party/partySlice";

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

interface FoundationTrackerProps {
  characterIndex: number;
}

const FoundationTracker: React.FC<FoundationTrackerProps> = ({ characterIndex }) => {
  const character: Character | undefined = useSelector((state: RootState) => state.party.members[characterIndex]);
  const dispatch = useDispatch();

  if (!character) {
    return <div>Loading...</div>; // Sometimes the character is undefined (usually not loaded yet)
  }

  const handleArrowClick = (
    type: keyof FoundationPoints,
    direction: "up" | "down"
  ) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const newPoints = { ...character[type] };

    if (direction === "down") {
      if (newPoints.vice > 0) {
        newPoints.balance += 1;
        newPoints.vice -= 1;
      } else if (newPoints.balance > 0) {
        newPoints.virtue += 1;
        newPoints.balance -= 1;
      }
    } else if (direction === "up") {
      if (newPoints.virtue > 0) {
        newPoints.balance += 1;
        newPoints.virtue -= 1;
      } else if (newPoints.balance > 0) {
        newPoints.vice += 1;
        newPoints.balance -= 1;
      }
    }

    if (type === "body") {
      dispatch(setBodyFoundation({ id: character.id, foundation: newPoints }));
    } else if (type === "mind") {
      dispatch(setMindFoundation({ id: character.id, foundation: newPoints }));
    } else if (type === "soul") {
      dispatch(setSoulFoundation({ id: character.id, foundation: newPoints }));
    }
  };

  const calculateStyle = (points: number) => {
    if (isNaN(points)) {
      points = 0; // If the character is undefined this can also be NaN
    }

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
    const value = character[type][zone];
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
      {(["body", "mind", "soul"] as (keyof FoundationPoints)[]).map((type) => (
        <div key={type} className="Foundation-type-panel">
          <div className="Foundation-type">
            <button
              className="Foundation-arrow Foundation-arrow-up"
              onClick={() => handleArrowClick(type, "up")}
            >
              +
            </button>
            {renderZone(type, "vice", "Vice")}
            {renderZone(type, "balance")}
            {renderZone(type, "virtue", "Virtue")}
            <button
              className="Foundation-arrow Foundation-arrow-down"
              onClick={() => handleArrowClick(type, "down")}
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
