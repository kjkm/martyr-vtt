import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import PageHeader from "../../components/molecules/pageheader/PageHeader";

const ProfilePage: React.FC = () => {
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
    <div className="ProfilePage App-page">
      <PageHeader />
      <div className="ProfilePage-content App-content">
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default ProfilePage;