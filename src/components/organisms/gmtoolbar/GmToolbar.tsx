import React, { useState } from "react";
import "./GmToolBar.css";

import EnvironmentPanel from "../../molecules/environmentpanel/EnvironmentPanel";
import { Environment } from "../../../types/types";

interface GmToolBarProps {
  environment: Environment | null;
}

const GmToolBar: React.FC<GmToolBarProps> = ({ environment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="GmToolbar">
      <button onClick={toggleExpand}>
        {isExpanded ? "Collapse Environment Panel" : "Expand Environment Panel"}
      </button>
      <EnvironmentPanel environment={environment} isExpanded={isExpanded} onCollapse={toggleExpand} />
    </div>
  );
};

export default GmToolBar;