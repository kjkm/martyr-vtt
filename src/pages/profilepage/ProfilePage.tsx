import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store"; // Adjust the import path as necessary
import {
  getFirestore,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentReference,
} from "firebase/firestore";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import "./ProfilePage.css";

interface Game {
  id: string;
  name: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.user.user.name);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchGames = async (gameRefs: DocumentReference[]) => {
      const gamesList: Game[] = [];
      for (const gameRef of gameRefs) {
        const gameDoc: DocumentSnapshot = await getDoc(gameRef);
        if (gameDoc.exists()) {
          gamesList.push({ id: gameDoc.id, name: gameDoc.data().name });
        }
      }
      setGames(gamesList);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.games) {
            await fetchGames(userData.games);
          }
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="ProfilePage App-page">
      <PageHeader />
      <div className="ProfilePage-content App-content">
        <div className="ProfilePage-content-header">
          <h1>Welcome, {username}</h1>
        </div>
        <div className="ProfilePage-content-description">
          <p>
            This is your profile page. Here you can view and manage your games.
          </p>
        </div>
        <div className="ProfilePage-content-body">
          <div className="ProfilePage-game-list">
            <div className="ProfilePage-game-list-options">
              <p>Your Games</p>
              <div className="ProfilePage-game-list-options-links">
                <Link className="ProfilePage-link" to="/games">
                  Find Game
                </Link>
                <Link className="ProfilePage-link" to="/games/new">
                  Create New Game
                </Link>
              </div>
            </div>
            <table className="ProfilePage-game-list-table">
              <thead>
                <tr>
                  <th className="ProfilePage-game-title">Game</th>
                  <th className="ProfilePage-game-join"></th>
                </tr>
              </thead>
              <tbody>
                {games.length > 0 ? (
                  games.map((game) => (
                    <tr key={game.id}>
                      <td>{game.name}</td>
                      <td>
                        <Link
                          className="ProfilePage-link"
                          to={`/games/${game.id}`}
                        >
                          Play
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>You don't have any games yet :(</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
