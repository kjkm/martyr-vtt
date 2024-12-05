import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import App from "./pages/App";
import HomePage from "./pages/homepage/HomePage";
import GamePage from "./pages/gamepage/GamePage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <App/>
);
