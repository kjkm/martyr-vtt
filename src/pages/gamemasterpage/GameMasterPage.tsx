import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import { Environment } from "../../types/types";
import { setEnvironments } from "../../state/environment/environmentSlice";
import { RootState } from "../../state/store";
import GmToolbar from "../../components/organisms/gmtoolbar/GmToolbar";
import "./GameMasterPage.css";
import { current } from "@reduxjs/toolkit";

const GameMasterPage: React.FC = () => {
  const dispatch = useDispatch();

  const initialEnvironment: Environment = {
    name: "New Environment",
    id: "root",
    screenPosition: { x: 0, y: 0 },
    children: [
      {
        name: "New Child",
        id: "new-child",
        screenPosition: { x: 50, y: 50 },
        children: [],
      },
    ]
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
      <GmToolbar environment={environment}/>
    </div>
  );
};

export default GameMasterPage;