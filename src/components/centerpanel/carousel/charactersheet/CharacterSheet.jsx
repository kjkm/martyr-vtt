import FoundationTracker from "./foundationtracker/FoundationTracker";
import "./CharacterSheet.css";

function CharacterSheet({ character }) {
  return (
    <div className="CharacterSheet">
      <div className="CharacterSheet-header">
        <div className="CharacterSheet-name">
          <h2>{character.name}</h2>
          <span className="CharacterSheet-epithet">{character.epithet}</span>
        </div>
        <div className="CharacterSheet-header-profile">
          <img
            src={character.thumbnail}
            alt={`${character.name}'s profile`}
            className="CharacterSheet-thumbnail"
          />
        </div>
      </div>
      <hr className="CharacterSheet-divider" />
      <FoundationTracker />
      <div className="CharacterSheet-details">
        {/* Add more character details here */}
      </div>
    </div>
  );
}

export default CharacterSheet;