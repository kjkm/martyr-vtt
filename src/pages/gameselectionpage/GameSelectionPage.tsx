import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import "./GameSelectionPage.css";
import PageHeader from "../../components/molecules/pageheader/PageHeader";

const GameSelectionPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchGames = async () => {
      const db = getFirestore();
      const gamesCollection = collection(db, "games");
      const gamesSnapshot = await getDocs(gamesCollection);
      const gamesList = gamesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesList);
    };

    fetchGames();
  }, []);

  const handleJoinGame = async (gameId: string) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const db = getFirestore();
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (!gameSnap.exists()) {
      console.error("Game not found");
      return;
    }

    const gameData = gameSnap.data();
    const userRef = doc(db, "users", user.uid);

    // Check if the user is the owner or already a player
    if (
      gameData.owner.id === user.uid ||
      gameData.players.some((playerRef: any) => playerRef.id === user.uid)
    ) {
      console.log(
        `User ${user.uid} is already the owner or a player in game ${gameId}`
      );
      navigate(`/games/${gameId}`);
      return;
    }

    // Check if there are open slots
    if (gameData.players.length >= gameData.maxPlayers) {
      console.error("No open slots available in the game");
      return;
    }

    try {
      // Add the user to the game's players array
      await updateDoc(gameRef, {
        players: arrayUnion(userRef),
      });

      // Add the game to the user's games array
      await updateDoc(userRef, {
        games: arrayUnion(gameRef),
      });

      console.log(`User ${user.uid} joined game ${gameId}`);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error("Error joining game: ", error);
    }
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="GameSelectionPage">
      <PageHeader />
      <div className="GameSelectionPage-content App-content">
        <div className="GameSelectionPage-options">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="GameSelection-search-button" type="submit">
              <svg
                className="GameSelection-search-icon"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#686868"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="GameSelectionPage-games">
          <table className="GameSelection-game-list-table">
            <thead>
              <tr>
                <th className="GameSelection-game-title">Name</th>
                <th className="GameSelection-player-count">Players</th>
                <th className="GameSelection-game-join">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game) => (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>
                    {game.players?.length || 0}/{game.maxPlayers}
                  </td>
                  <td>
                    {user &&
                    (game.owner === user.uid ||
                      game.players?.length >= game.maxPlayers) ? (
                      <button className="GameSelection-link" disabled>
                        Join
                      </button>
                    ) : (
                      <button
                        className="GameSelection-link"
                        onClick={() => handleJoinGame(game.id)}
                      >
                        Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="GameSelectionPage-footer">
        <Link to="/games/new" className="NewGame-button">
          Create New Game
        </Link>
      </div>
    </div>
  );
};

export default GameSelectionPage;
