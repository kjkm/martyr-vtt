import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../state/store";

import AuthChecker from "../components/atoms/authchecker/AuthChecker";

import HomePage from "./homepage/HomePage";
import GamePage from "./gamepage/GamePage";
import GameSelectionPage from "./gameselectionpage/GameSelectionPage";
import ProfilePage from "./profilepage/ProfilePage";
import LoginPage from "./loginpage/LoginPage";
import NewGamePage from "./newgamepage/NewGamePage";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthChecker />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:gameId" element={<GamePage />} />
            <Route path="/games/new" element={<NewGamePage />} />
            <Route path="/games" element={<GameSelectionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

