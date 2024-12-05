import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../state/store";

import HomePage from "./homepage/HomePage";
import GamePage from "./gamepage/GamePage";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

