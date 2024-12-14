import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import { Environment } from "../../types/types";
import { setEnvironments } from "../../state/environment/environmentSlice";
import { RootState } from "../../state/store";
import GmToolBar from "../../components/organisms/gmtoolbar/GmToolBar";
import "./GameMasterPage.css";
import { current } from "@reduxjs/toolkit";

const GameMasterPage: React.FC = () => {
  const dispatch = useDispatch();

  const initialEnvironment: Environment = {
    name: "The City of Example",
    id: "example-kingdom",
    screenPosition: { x: 0, y: 0 },
    description: "A kingdom with many different regions.",
    children: [
      {
        name: "Region 1",
        id: "region-1",
        screenPosition: { x: 0, y: 0 },
        description: "A region within the kingdom.",
        children: [
          {
            name: "Subregion 1",
            id: "subregion-1",
            screenPosition: { x: 0, y: 0 },
            description: "A subregion within Region 1.",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    dispatch(setEnvironments([initialEnvironment]));
  }, [dispatch]);

  const environment = useSelector((state: RootState) => state.environments.environments[0]);
  let currentEnvironment = environment;

  return (
    <div className="GameMasterPage App-page">
      <PageHeader />
      <div className="GameMasterPage-content App-content">
        {currentEnvironment && <MapContainer environment={currentEnvironment} />}
      </div>
      <GmToolBar environment={environment}/>
    </div>
  );
};

export default GameMasterPage;