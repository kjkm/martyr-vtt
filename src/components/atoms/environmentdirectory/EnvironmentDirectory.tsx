import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Environment } from "../../../types/types";
import { updateEnvironment, setScreenPosition, addEnvironment } from "../../../state/environment/environmentSlice";

interface EnvironmentDirectoryProps {
  environment: Environment;
}

const EnvironmentDirectory: React.FC<EnvironmentDirectoryProps> = ({ environment }) => {
  const dispatch = useDispatch();
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>(environment);
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState(currentEnvironment.name);
  const [description, setDescription] = useState(currentEnvironment.description || "");
  const [screenPosition, setScreenPositionState] = useState(currentEnvironment.screenPosition || { x: 0, y: 0 });
  const [newChildName, setNewChildName] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpdate = () => {
    const updatedEnvironment: Environment = {
      ...currentEnvironment,
      name,
      description,
      screenPosition,
    };
    dispatch(updateEnvironment(updatedEnvironment));
  };

  const handleScreenPositionChange = (axis: 'x' | 'y', value: number) => {
    const newScreenPosition = { ...screenPosition, [axis]: value };
    setScreenPositionState(newScreenPosition);
    dispatch(setScreenPosition({ id: currentEnvironment.id, screenPosition: newScreenPosition }));
  };

  const handleAddChild = () => {
    const newChild: Environment = {
      name: newChildName,
      id: `${currentEnvironment.id}-${newChildName.toLowerCase().replace(/\s+/g, '-')}`,
      description: "",
      screenPosition: { x: 0, y: 0 },
      parent: currentEnvironment,
      children: [],
    };
    const updatedEnvironment: Environment = {
      ...currentEnvironment,
      children: currentEnvironment.children ? [...currentEnvironment.children, newChild] : [newChild],
    };
    dispatch(updateEnvironment(updatedEnvironment));
    setCurrentEnvironment(updatedEnvironment); // Update the current environment state
    setNewChildName("");
  };

  const handleChildClick = (child: Environment) => {
    setCurrentEnvironment(child);
    setName(child.name);
    setDescription(child.description || "");
    setScreenPositionState(child.screenPosition || { x: 0, y: 0 });
  };

  const handleBackClick = () => {
    if (currentEnvironment.parent) {
      const parentEnvironment = currentEnvironment.parent;
      setCurrentEnvironment(parentEnvironment);
      setName(parentEnvironment.name);
      setDescription(parentEnvironment.description || "");
      setScreenPositionState(parentEnvironment.screenPosition || { x: 0, y: 0 });
    }
  };

  return (
    <div>
      <div onClick={toggleExpand} style={{ cursor: "pointer" }}>
        {currentEnvironment.name}
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
                onChange={(e) => handleScreenPositionChange('x', parseInt(e.target.value) || 0)}
              />
            </label>
          </div>
          <div>
            <label>
              Screen Position Y:
              <input
                type="number"
                value={screenPosition.y}
                onChange={(e) => handleScreenPositionChange('y', parseInt(e.target.value) || 0)}
              />
            </label>
          </div>
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
          {currentEnvironment.parent && (
            <button onClick={handleBackClick}>Back</button>
          )}
          <div>
            <h3>Child Environments</h3>
            {currentEnvironment.children && (
              <div>
                {currentEnvironment.children.map((child) => (
                  <div key={child.id} onClick={() => handleChildClick(child)} style={{ cursor: "pointer" }}>
                    {child.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentDirectory;