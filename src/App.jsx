import { useState } from "react";
import MapDrawer from "./components/mapdrawer/MapDrawer";
import Toolbar from "./components/toolbar/Toolbar";
import CenterPanel from "./components/centerpanel/CenterPanel";
import Slide from "./components/centerpanel/carousel/slide/Slide";
import ScriptWindow from "./components/centerpanel/carousel/scriptwindow/ScriptWindow";
import CompanionWindow from "./components/centerpanel/carousel/companionwindow/CompanionWindow";
import "./App.css";

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [messages, setMessages] = useState([
    { type: "user", content: "hi" },
    { type: "bot", content: "hey" },
    { type: "user", content: "sup" },
    { type: "bot", content: "not much, u?" },
  ]);

  const companions = [
    {
      name: "Aragorn",
      thumbnail: "path/to/aragorn.jpg",
      body: 10,
      mind: 8,
      soul: 7,
    },
    {
      name: "Legolas",
      thumbnail: "path/to/legolas.jpg",
      body: 9,
      mind: 9,
      soul: 6,
    },
    {
      name: "Gimli",
      thumbnail: "path/to/gimli.jpg",
      body: 10,
      mind: 7,
      soul: 8,
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleSendMessage = (message) => {
    console.log("Message received:", message); // Debugging log
    setMessages([...messages, { type: "user", content: message }]);
  };

  return (
    <div className="App">
      <MapDrawer />
      <CenterPanel activeSlide={activeSlide}>
        <Slide>Character</Slide>
        <Slide>Rulebook</Slide>
        <Slide>Playmat</Slide>
        <Slide>
          <CompanionWindow companions={companions} />
        </Slide>
        <Slide>
          <ScriptWindow messages={messages} onSendMessage={handleSendMessage} />
        </Slide>
      </CenterPanel>
      <Toolbar onSlideChange={handleSlideChange} />
    </div>
  );
}

export default App;
