import { useState, useEffect } from "react";
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
import { addMember, Character, Foundation } from "../state/party/partySlice";
import { RootState } from "../state/store";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface Companion {
  name: string;
  epithet: string;
  thumbnail: string;
  body: number;
  mind: number;
  soul: number;
}

const App: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(2);
  const [messages, setMessages] = useState<Message[]>([
    { type: "user", content: "hi" },
    { type: "bot", content: "hey" },
    { type: "user", content: "sup" },
    { type: "bot", content: "not much, u?" },
  ]);

  const companions: Companion[] = [
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

  /* REDUX PARTY CONVERSION WIP */
  const party = useSelector((state: RootState) => state.party);
  const dispatch = useDispatch();

  const aragorn: Character = {
    id: "0",
    name: "Aragorn",
    epithet: "The Dúnadan",
    thumbnail: "path/to/aragorn.jpg",
    rank: 1,
    body: { max: 3, current: 3, vice: 0, balance: 3, virtue: 0 },
    mind: { max: 3, current: 3, vice: 0, balance: 3, virtue: 0 },
    soul: { max: 4, current: 4, vice: 0, balance: 4, virtue: 0 },
  };

  useEffect(() => {
    dispatch(addMember(aragorn));
  }, []);
  /* END REDUX PARTY CONVERSION WIP */

  const handleSlideChange = (index: number) => {
    console.log("Slide change:", index); // Debugging log
    setActiveSlide(index);
  };

  const handleSendMessage = (message: string) => {
    console.log("Message received:", message); // Debugging log
    setMessages([...messages, { type: "user", content: message }]);
  };

  useEffect(() => {
    const handleTouchStart = () => {
      document.body.classList.add("no-hover");
    };

    const handleMouseMove = () => {
      document.body.classList.remove("no-hover");
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <MapDrawer />
      <CenterPanel onSlideChange={handleSlideChange} activeSlide={activeSlide}>
        <Slide>
          <Counter />
        </Slide>
        <Slide>
          <CharacterSheet characterIndex={0} />
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
};

export default App;
