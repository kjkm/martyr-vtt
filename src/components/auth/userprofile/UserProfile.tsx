import React from 'react';
import { User, signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "./UserProfile.css";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="UserProfile">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;