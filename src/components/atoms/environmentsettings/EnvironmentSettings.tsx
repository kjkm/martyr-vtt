import React, { useState } from "react";
import "./EnvironmentSettings.css";
import { Environment } from "../../../types/types";
import { RootState } from "../../../state/store";
import { updateEnvironment } from "../../../state/environment/environmentSlice";
import { useDispatch, useSelector } from "react-redux";

interface EnvironmentSettingsProps {
  environment: Environment;
  showPointsOfInterest?: boolean;
}

const EnvironmentSettings: React.FC<EnvironmentSettingsProps> = ({
  environment,
  showPointsOfInterest = true,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(environment.name);
  const [description, setDescription] = useState(environment.description || "");
  const [screenPosition, setScreenPosition] = useState(
    environment.screenPosition || { x: 0, y: 0 }
  );
  const [childList, setChildList] = useState(environment.children || []);
  const [expandedChildId, setExpandedChildId] = useState<string | null>(null);

  const handleUpdate = () => {
    const updatedEnvironment: Environment = {
      ...environment,
      name,
      description,
      screenPosition,
      children: childList,
    };
    dispatch(updateEnvironment(updatedEnvironment));
  };

  const handleRowClick = (childId: string) => {
    setExpandedChildId(expandedChildId === childId ? null : childId);
  };

  const handleAddChild = () => {
    const newChild = {
      id: `${Date.now()}`,
      name: "New Child",
      description: "",
      screenPosition: { x: 0, y: 0 },
      children: [],
    };
    const updatedChildList = [...childList, newChild]; // Updated child list
    setChildList(updatedChildList);

    const updatedEnvironment: Environment = {
      ...environment,
      children: updatedChildList, // Updated environment with new child list
    };
    dispatch(updateEnvironment(updatedEnvironment)); // Dispatched updateEnvironment
  };

  return (
    <div className="EnvironmentSettings">
      <div className="EnvironmentSettings-content">
        <div className="EnvironmentSettings-field">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleUpdate}
            size={40}
          />
        </div>
        <div className="EnvironmentSettings-field">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleUpdate}
            rows={5}
            cols={40}
            placeholder="Enter description here..."
          />
        </div>
        <div className="EnvironmentSettings-field">
          <div className="EnvironmentSettings-screenPosition">
            <div className="EnvironmentSettings-field">
              <label>x:</label>
              <input
                type="number"
                value={screenPosition.x}
                onChange={(e) =>
                  setScreenPosition({
                    x: parseInt(e.target.value) || 0,
                    y: screenPosition.y,
                  })
                }
              />
            </div>
            <div className="EnvironmentSettings-field">
              <label>y:</label>
              <input
                type="number"
                value={screenPosition.y}
                onChange={(e) =>
                  setScreenPosition({
                    x: screenPosition.x,
                    y: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>
        {showPointsOfInterest && (
          <>
            <hr />
            <div className="EnvironmentSettings-content">
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Point of Interest</th>
                    <th style={{ textAlign: "right" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {childList && childList.length > 0 ? (
                    childList.map((child) => (
                      <React.Fragment key={child.id}>
                        <tr onClick={() => handleRowClick(child.id)}>
                          <td style={{ textAlign: "left" }}>{child.name}</td>
                          <td style={{ textAlign: "right" }}>
                            {expandedChildId === child.id ? "-" : "+"}
                          </td>
                        </tr>
                        {expandedChildId === child.id && (
                          <tr>
                            <td colSpan={2}>
                              <EnvironmentSettings
                                environment={child}
                                showPointsOfInterest={false}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No points of interest</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="EnvironmentSettings-field">
              <button onClick={handleAddChild}>Add New Child</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnvironmentSettings;
