import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Header from "../../components/molecules/pageheader/PageHeader";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button/Button";

function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="HomePage App-page">
      <Header />
      <div className="HomePage-content App-content">
        <h1>Welcome to Martyr!</h1>
        <p>A TTRPG for better stories.</p>
        <Button onClick={handleButtonClick}>
          {user ? "Play" : "Login"}
        </Button>
      </div>
    </div>
  );
}

export default HomePage;