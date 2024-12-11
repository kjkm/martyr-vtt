import React, { useState } from "react";
import "./NewGamePage.css";
import PageHeader from "../../components/molecules/pageheader/PageHeader";
import Button from "../../components/atoms/button/Button";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const NewGamePage: React.FC = () => {
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const navigate = useNavigate();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayers(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const db = getFirestore();

    try {
      // Create a new game document in Firestore
      const gameRef = await addDoc(collection(db, "games"), {
        name: gameName,
        description: gameDescription,
        maxPlayers,
        owner: doc(db, "users", user.uid),
        players: [],
        createdAt: new Date(),
      });

      // Add the game document reference to the user's "games" in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        games: arrayUnion(doc(db, "games", gameRef.id)),
      });

      console.log("Game created with ID: ", gameRef.id);
      navigate(`/games/${gameRef.id}`);
    } catch (error) {
      console.error("Error creating game: ", error);
    }
  };

  return (
    <div className="NewGamePage App-page">
      <PageHeader />
      <h1>New Game</h1>
      <div className="NewGamePage-content App-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="game-name">Game Name</label>
          <input
            type="text"
            id="game-name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />

          <label htmlFor="game-description">Description</label>
          <textarea
            id="game-description"
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
          />

          <label htmlFor="max-players">Max Players: {maxPlayers}</label>
          <input
            type="range"
            id="max-players"
            min="1"
            max="8"
            value={maxPlayers}
            onChange={handleSliderChange}
          />

          <Button type="submit">Create Game</Button>
        </form>
      </div>
    </div>
  );
};

export default NewGamePage;
