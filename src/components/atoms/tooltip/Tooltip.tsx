import React from "react";
import "./Tooltip.css";

interface TooltipProps {
  isExpanded: boolean;
  onCollapse: () => void;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ isExpanded, onCollapse, children }) => {
  return (
    <div className="Tooltip-container">
      <div className={`Tooltip-box ${isExpanded ? "expanded" : "collapsed"}`}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;