import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./VttPage.css";

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
        const isPlayer = game.players.some((playerRef: any) => playerRef.id === user.uid);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="VttPage">
      <h1>VttPage</h1>
    </div>
  );
};

export default VttPage;