import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Environment } from "../../../types/types";
import {
  updateEnvironment,
  setScreenPosition,
  addEnvironment,
} from "../../../state/environment/environmentSlice";

interface EnvironmentDirectoryProps {
  environment: Environment;
}

const EnvironmentDirectory: React.FC<EnvironmentDirectoryProps> = ({
  environment,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState(environment.name);
  const [description, setDescription] = useState(environment.description || "");
  const [screenPosition, setScreenPositionState] = useState(
    environment.screenPosition || { x: 0, y: 0 }
  );
  const [newChildName, setNewChildName] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpdate = () => {
    const updatedEnvironment: Environment = {
      ...environment,
      name,
      description,
      screenPosition,
    };
    dispatch(updateEnvironment(updatedEnvironment));
  };

  const handleScreenPositionChange = (axis: "x" | "y", value: number) => {
    const newScreenPosition = { ...screenPosition, [axis]: value };
    setScreenPositionState(newScreenPosition);
    dispatch(
      setScreenPosition({
        id: environment.id,
        screenPosition: newScreenPosition,
      })
    );
  };

  const handleAddChild = () => {
    const newChild: Environment = {
      name: newChildName,
      id: `${environment.id}-${newChildName
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      description: "",
      screenPosition: { x: 0, y: 0 },
      children: [],
    };
    const updatedEnvironment: Environment = {
      ...environment,
      children: environment.children
        ? [...environment.children, newChild]
        : [newChild],
    };
    dispatch(updateEnvironment(updatedEnvironment));
    setNewChildName("");
  };

  return (
    <div>
      <div onClick={toggleExpand} style={{ cursor: "pointer" }}>
        {environment.name}
      </div>
      {isExpanded && (
        <div style={{ paddingLeft: "20px" }}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleUpdate}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleUpdate}
              />
            </label>
          </div>
          <div>
            <label>
              Screen Position X:
              <input
                type="number"
                value={screenPosition.x}
                onChange={(e) =>
                  handleScreenPositionChange("x", parseInt(e.target.value) || 0)
                }
              />
            </label>
          </div>
          <div>
            <label>
              Screen Position Y:
              <input
                type="number"
                value={screenPosition.y}
                onChange={(e) =>
                  handleScreenPositionChange("y", parseInt(e.target.value) || 0)
                }
              />
            </label>
          </div>
          {environment.children && (
            <div>
              {environment.children.map((child) => (
                <EnvironmentDirectory key={child.id} environment={child} />
              ))}
            </div>
          )}
          <div>
            <label>
              Add Child Environment:
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
              />
              <button onClick={handleAddChild}>Add</button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentDirectory;
