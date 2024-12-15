import React from "react";
import "./EnvironmentPanel.css";

import { Environment } from "../../../types/types";
import Tooltip from "../../atoms/tooltip/Tooltip";
import EnvironmentDirectory from "../../atoms/environmentdirectory/EnvironmentDirectory";
import EnvironmentSettings from "../../atoms/environmentsettings/EnvironmentSettings";


interface EnvironmentPanelProps {
  environment: Environment | null;
  isExpanded: boolean;
  onCollapse: () => void;
}

const EnvironmentPanel: React.FC<EnvironmentPanelProps> = ({ environment, isExpanded, onCollapse }) => {
  return (
    <div className="EnvironmentPanel">
      <Tooltip isExpanded={isExpanded} onCollapse={onCollapse}>
        {/* {environment ? (
          <EnvironmentDirectory environment={environment} />
        ) : (
          <div>No environment found.</div>
        )} */}
        {environment ? (
          <EnvironmentSettings environment={environment} />
        ) : (
          <div>No environment found.</div>
        )}
      </Tooltip>
    </div>
  );
};

export default EnvironmentPanel;