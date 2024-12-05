import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./PopupMenu.css";

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      const db = getFirestore();
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username,
          email,
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    onClose();
  };

  return (
    <div className={`PopupMenu ${isOpen ? "open" : ""}`}>
      <div className="PopupMenu-content">
        <button className="PopupMenu-close" onClick={onClose}>
          X
        </button>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <ul>
              <li>
                <Link to="/mygames" onClick={onClose}>Games</Link>
              </li>
              <li>
                <Link to="/profile" onClick={onClose}>Profile</Link>
              </li>
            </ul>
            <button className="PopupMenu-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleAuth}>
            {!isLogin && (
                <>
                  <div>
                    <label>Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div>
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button className="PopupMenu-switch" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Switch to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupMenu;