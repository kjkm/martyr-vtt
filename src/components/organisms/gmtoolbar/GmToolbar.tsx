import React, { useState } from "react";
import "./GmToolbar.css";

import EnvironmentPanel from "../../molecules/environmentpanel/EnvironmentPanel";
import { Environment } from "../../../types/types";

interface GmToolbarProps {
  environment: Environment | null;
}

const GmToolbar: React.FC<GmToolbarProps> = ({ environment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="GmToolbar">
      <div className="Menu-option">
        <EnvironmentPanel
          environment={environment}
          isExpanded={isExpanded}
          onCollapse={toggleExpand}
        />
        <button onClick={toggleExpand}>
          {isExpanded
            ? "Collapse Environment Panel"
            : "Expand Environment Panel"}
        </button>
      </div>
    </div>
  );
};

export default GmToolbar;
