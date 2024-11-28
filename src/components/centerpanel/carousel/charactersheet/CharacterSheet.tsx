import React from "react";
import { useSelector } from "react-redux";
import FoundationTracker from "./foundationtracker/FoundationTracker";
import { Character } from "../../../../state/party/partySlice";
import { RootState } from "../../../../state/store";
import "./CharacterSheet.css";

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const mainCharacter: Character | undefined = useSelector(
    (state: RootState) => state.party.members[1]
  );

  return (
    <div className="CharacterSheet">
      <div className="CharacterSheet-header">
        <div className="CharacterSheet-name">
          <h2>{mainCharacter ? mainCharacter.name : "New Character"}</h2>
          <span className="CharacterSheet-epithet">
            {mainCharacter ? mainCharacter.name : "The Unborn"}
          </span>
        </div>
        <div className="CharacterSheet-header-profile">
          <img
            src={mainCharacter ? mainCharacter.thumbnail : ""}
            alt={
              mainCharacter
                ? `${mainCharacter.name}'s profile`
                : "Unknown profile"
            }
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
};

export default CharacterSheet;
