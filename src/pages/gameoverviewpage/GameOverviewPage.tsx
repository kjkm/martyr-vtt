import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import "./GameOverviewPage.css";

const GameOverviewPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameData, setGameData] = useState<any>(null);
  const [ownerName, setOwnerName] = useState<string>("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      const db = getFirestore();
      const gameRef = doc(db, "games", gameId);
      const gameSnap = await getDoc(gameRef);

      if (gameSnap.exists()) {
        const game = gameSnap.data();
        setGameData(game);

        // Fetch owner name
        const ownerRef = game.owner;
        const ownerSnap = await getDoc(ownerRef);
        if (ownerSnap.exists()) {
          setOwnerName(ownerSnap.data().username);
        }

        // Fetch player names
        const playerNamesPromises = game.players.map(async (playerRef: any) => {
          const playerSnap = await getDoc(playerRef);
          return playerSnap.exists()
            ? playerSnap.data().username
            : "Unknown Player";
        });
        const names = await Promise.all(playerNamesPromises);
        setPlayerNames(names);
      }
    };

    fetchGameData();
  }, [gameId]);

  const handleJoinGame = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate(`/game/${gameId}`);
      return;
    }

    const db = getFirestore();
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      const game = gameSnap.data();
      const isOwner = game.owner.id === user.uid;
      const isPlayer = game.players.some(
        (playerRef: any) => playerRef.id === user.uid
      );

      if (isOwner) {
        navigate(`/gm/${gameId}`);
      } else if (isPlayer) {
        navigate(`/play/${gameId}`);
      } else {
        navigate(`/game/${gameId}`);
      }
    } else {
      navigate(`/game/${gameId}`);
    }
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="GameOverviewPage App-page">
      <PageHeader />
      <div className="GameOverviewPage-content App-content">
        <h1>{gameData.name}</h1>
        <div className="GameOverviewPage-game-info">
          <div className="GameOverviewPage-member-box game-owner">
            Owner:
            <ul>
              <li>{ownerName}</li>
            </ul>
          </div>
          <div className="GameOverviewPage-member-box game-players">
            Players: {playerNames.length}/{gameData.maxPlayers}
            <ul>
              {playerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="GameOverviewPage-member-box game-description">
          {gameData.description}
        </div>
        <button onClick={handleJoinGame}>Play</button>
      </div>
    </div>
  );
};

export default GameOverviewPage;
