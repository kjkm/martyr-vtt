import FoundationTracker from "./foundationtracker/FoundationTracker";
import "./CharacterSheet.css";

function CharacterSheet({ character }) {
  return (
    <div className="CharacterSheet">
      <div className="CharacterSheet-header">
        <img
          src={character.thumbnail}
          alt={`${character.name}'s profile`}
          className="CharacterSheet-thumbnail"
        />
        <h2 className="CharacterSheet-name">{character.name}</h2>
      </div>
      <FoundationTracker />
      <div className="CharacterSheet-details">
        {/* Add more character details here */}
      </div>
    </div>
  );
}

export default CharacterSheet;
