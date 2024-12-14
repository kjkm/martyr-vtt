import React from "react";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import { Environment } from "../../types/types";
import "./GameMasterPage.css";

const GameMasterPage: React.FC = () => {
  const locations = [
    { 
      name: "Mt. Dragonstone", 
      description: "A large mountain where dragons are said to live.",
      x: 51, y: 43 
    },
    { 
      name: "Salt Town", 
      description: "A town known for its salt mines.",
      x: 35, y: 62 
    },
    { 
      name: "The Riverlands", 
      description: "A fertile region with many rivers.",
      x: 67, y: 61.5 
    },
  ];

  const environment: Environment = {
    name: "The City of Example",
    id: "example-kingdom",
    description: "A kingdom with many different regions.",
    backgroundImage: "/maps/default-map.webp",
    screenPosition: { x: 0, y: 0 },
    children: locations.map((location, index) => ({
      name: location.name,
      id: location.name.toLowerCase().replace(/ /g, "-"),
      description: location.description,
      screenPosition: { x: location.x, y: location.y }
    }))
  };

  return (
    <div className="GameMasterPage App-page">
      <PageHeader />
      <div className="GameMasterPage-content App-content">
        <MapContainer environment={environment} />
      </div>
    </div>
  );
};

export default GameMasterPage;
