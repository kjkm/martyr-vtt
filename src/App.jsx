import MapDrawer from "./components/mapdrawer/MapDrawer";
import Toolbar from "./components/toolbar/Toolbar";
import CenterPanel from "./components/centerpanel/CenterPanel";
import "./App.css";
import Slide from "./components/centerpanel/carousel/slide/Slide";
import { useState } from "react";

function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  }

  return (
    <div className="App">
      <MapDrawer />
      <CenterPanel>
        <Slide>Character</Slide>
        <Slide>Rulebook</Slide>
        <Slide>Playmat</Slide>
        <Slide>Companions</Slide>
        <Slide>Script</Slide>
      </CenterPanel>
      <Toolbar onSlideChange={handleSlideChange}/>
    </div>
  );
}

export default App;
