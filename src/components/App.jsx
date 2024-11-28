import { useState } from "react";
import MapDrawer from "./mapdrawer/MapDrawer";
import Toolbar from "./toolbar/Toolbar";
import CenterPanel from "./centerpanel/CenterPanel";
import Slide from "./centerpanel/carousel/slide/Slide";
import CharacterSheet from "./centerpanel/carousel/charactersheet/CharacterSheet";
import ScriptWindow from "./centerpanel/carousel/scriptwindow/ScriptWindow";
import CompanionWindow from "./centerpanel/carousel/companionwindow/CompanionWindow";
import "./App.css";

import Counter from "./counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import { addMember } from "../state/party/partySlice";

function App() {
  const [activeSlide, setActiveSlide] = useState(2);
  const [messages, setMessages] = useState([
    { type: "user", content: "hi" },
    { type: "bot", content: "hey" },
    { type: "user", content: "sup" },
    { type: "bot", content: "not much, u?" },
  ]);

  const companions = [
    {
      name: "Aragorn",
      epithet: "The Dúnadan",
      thumbnail: "path/to/aragorn.jpg",
      body: 10,
      mind: 8,
      soul: 7,
    },
    {
      name: "Legolas",
      epithet: "Prince of Mirkwood",
      thumbnail: "path/to/legolas.jpg",
      body: 9,
      mind: 9,
      soul: 6,
    },
    {
      name: "Gimli",
      epithet: "Son of the Mountain",
      thumbnail: "path/to/gimli.jpg",
      body: 10,
      mind: 7,
      soul: 8,
    },
  ];

  const handleSlideChange = (index) => {
    console.log("Slide change:", index); // Debugging log
    setActiveSlide(index);
  };

  const handleSendMessage = (message) => {
    console.log("Message received:", message); // Debugging log
    setMessages([...messages, { type: "user", content: message }]);
  };

  document.addEventListener("touchstart", () => {
    document.body.classList.add("no-hover");
  });

  document.addEventListener("mousemove", () => {
    document.body.classList.remove("no-hover");
  });

  return (
    <div className="App">
      <MapDrawer />
      <CenterPanel onSlideChange={handleSlideChange} activeSlide={activeSlide}>
        <Slide>
          <Counter />
        </Slide>
        <Slide>
          <CharacterSheet character={companions[0]} />
        </Slide>
        <Slide>Playmat</Slide>
        <Slide>
          <ScriptWindow messages={messages} onSendMessage={handleSendMessage} />
        </Slide>
        <Slide>
          <CompanionWindow companions={companions} />
        </Slide>
      </CenterPanel>
      <Toolbar onSlideChange={handleSlideChange} activeSlide={activeSlide} />
    </div>
  );
}

export default App;
