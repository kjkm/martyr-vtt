import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import MapContainer from "../../components/molecules/mapcontainer/MapContainer";
import "./VttPage.css";
import { Environment } from "../../types/types";

const VttPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        navigate(`/games/${gameId}`);
        return;
      }

      const gameRef = doc(db, "games", gameId);
      const gameSnap = await getDoc(gameRef);

      if (gameSnap.exists()) {
        const game = gameSnap.data();
        const isPlayer = game.players.some(
          (playerRef: any) => playerRef.id === user.uid
        );

        if (!isPlayer && game.owner.id !== user.uid) {
          navigate(`/games/${gameId}`);
        } else {
          setLoading(false);
        }
      } else {
        navigate(`/games/${gameId}`);
      }
    };

    fetchGameData();
  }, [gameId, navigate]);

  const locations = [
    { 
      name: "Chapel", 
      description: "A small chapel where people come to pray.",
      x: 48.8, y: 43.7 
    },
    { 
      name: "Town Hall", 
      description: "The town hall is where the mayor works.",
      x: 57, y: 51 
    },
    { 
      name: "The Fountain", 
      description: "A beautiful fountain in the middle of the town square.",
      x: 46, y: 58.3 
    },
  ];
  
  const environment: Environment = {
    name: "City of Example",
    id: "example-city",
    description: "A city with many buildings and streets.",
    backgroundImage: "/maps/example-city.webp",
    children: locations.map((location, index) => ({
      name: location.name,
      id: location.name.toLowerCase().replace(/ /g, "-"),
      description: location.description,
      screenPosition: { x: location.x, y: location.y }
    }))
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="VttPage App-page">
      <PageHeader />
      <div className="VttPage-content App-content">
        <MapContainer environment={environment} />
      </div>
    </div>
  );
};

export default VttPage;
