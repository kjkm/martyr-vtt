import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import { Environment } from "../../types/types";
import { setEnvironments } from "../../state/environment/environmentSlice";
import { RootState } from "../../state/store";
import EnvironmentDirectory from "../../components/molecules/EnvironmentDirectory/EnvironmentDirectory";
import "./GameMasterPage.css";

const GameMasterPage: React.FC = () => {
  const dispatch = useDispatch();

  const initialEnvironment: Environment = {
    name: "The City of Example",
    id: "example-kingdom",
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

  return (
    <div className="GameMasterPage App-page">
      <PageHeader />
      <div className="GameMasterPage-content App-content">
        {environment && <MapContainer environment={environment} />}
        {environment && <EnvironmentDirectory environment={environment} />}
      </div>
    </div>
  );
};

export default GameMasterPage;