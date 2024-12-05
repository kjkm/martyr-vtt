import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/profile");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      const db = getFirestore();
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/profile");
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username,
          email,
        });
        navigate("/profile");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage-content">
        <div className="header-container">
          <Link to="/" className="back-button">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#686868"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              />
              <path
                fill="#686868"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              />
            </svg>
          </Link>
          <h1>{isLogin ? "Login" : "Register"}</h1>
        </div>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button
          className="LoginPage-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
