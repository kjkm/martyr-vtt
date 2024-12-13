import React from "react";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import "./GameMasterPage.css";

const GameMasterPage: React.FC = () => {
  const backgroundImage = "/maps/default-map.webp";

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

  return (
    <div className="GameMasterPage App-page">
      <PageHeader />
      <div className="GameMasterPage-content App-content">
        <MapContainer backgroundImage={backgroundImage} locations={locations} />
      </div>
    </div>
  );
};

export default GameMasterPage;
