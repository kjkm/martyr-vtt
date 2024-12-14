import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../state/store";

import AuthChecker from "../components/atoms/authchecker/AuthChecker";
import AuthDefault from "../components/atoms/authdefault/AuthDefault";

import HomePage from "./homepage/HomePage";
import GameSelectionPage from "./gameselectionpage/GameSelectionPage";
import ProfilePage from "./profilepage/ProfilePage";
import NewGamePage from "./newgamepage/NewGamePage";
import LoginPage from "./loginpage/LoginPage";
import GameOverviewPage from "./gameoverviewpage/GameOverviewPage";
import VttPage from "./vttpage/VttPage";
import GameMasterPage from "./gamemasterpage/GameMasterPage";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthChecker />
        <AuthDefault />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:gameId" element={<GameOverviewPage />} />
            <Route path="/games/new" element={<NewGamePage />} />
            <Route path="/games" element={<GameSelectionPage />} />
            <Route path="/play/:gameId" element={<VttPage />} />
            <Route path="/gm/:gameId" element={<GameMasterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

