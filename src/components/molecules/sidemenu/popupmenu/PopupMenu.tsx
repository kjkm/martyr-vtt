import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { Link, useNavigate } from "react-router-dom";
import "./PopupMenu.css";

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const username = useSelector((state: RootState) => state.user.user.name);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    onClose();
    navigate("/");
  };

  return (
    <div className={`PopupMenu ${isOpen ? "open" : ""}`}>
      <div className="PopupMenu-content">
        <button className="PopupMenu-close" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 9.418C7.613 9.028 7.613 8.394 8 8.004C8.394 7.613 9.028 7.613 9.418 8.004L12 10.592L14.591 8.007C14.981 7.616 15.614 7.616 16.005 8.007C16.395 8.397 16.395 9.03 16.005 9.421L13.42 12.006L16.004 14.59C16.394 14.98 16.394 15.613 16.004 16.004C15.613 16.395 14.98 16.395 14.59 16.004L12 13.42L9.421 16.005C9.03 16.395 8.397 16.395 8.007 16.005C7.616 15.614 7.616 14.981 8.007 14.591L10.592 12.006L8 9.418Z"
              fill="#686868"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12ZM3.007 12C3.007 16.967 7.033 20.993 12 20.993C16.967 20.993 20.993 16.967 20.993 12C20.993 7.033 16.967 3.007 12 3.007C7.033 3.007 3.007 7.033 3.007 12Z"
              fill="#686868"
            />
          </svg>
        </button>
        <div>
          {user ? <p>Welcome, {username}</p> : <p>Welcome</p>}
          <ul>
            {user && (
              <>
                <li>
                  <Link to="/profile" onClick={onClose}>
                    My Games
                  </Link>
                </li>
                <li>
                  <Link to="/games" onClick={onClose}>
                    Find Group
                  </Link>
                </li>
              </>
            )}
            <li>
              {user ? (
                <Link
                  to="#"
                  onClick={handleLogout}
                  className="PopupMenu-logout"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="PopupMenu-logout"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
