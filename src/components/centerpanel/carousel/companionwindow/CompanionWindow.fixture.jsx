import CompanionWindow from "./CompanionWindow";
import "./CompanionWindow.css";

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

export default <CompanionWindow companions={companions} />;
