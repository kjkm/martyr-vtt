import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./GameSelectionPage.css";
import PageHeader from "../../components/molecules/pageheader/PageHeader";

const GameSelectionPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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

  return (
    <div className="GameSelectionPage">
      <PageHeader />
      <div className="GameSelectionPage-content App-content">
        <div className="GameSelectionPage-options">
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#686868"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </form>
          <div className="GameSelectionPage-games"></div>
        </div>
      </div>
      <div className="GameSelectionPage-footer">
        <button className="NewGame-button">Create New Game</button>
      </div>
    </div>
  );
};

export default GameSelectionPage;
