import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../state/store";

import HomePage from "./homepage/HomePage";
import GamePage from "./gamepage/GamePage";
import GameSelectionPage from "./gameselectionpage/GameSelectionPage";
import ProfilePage from "./profilepage/ProfilePage";
import LoginPage from "./loginpage/LoginPage";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/mygames" element={<GameSelectionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

