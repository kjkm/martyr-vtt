import "./CompanionWindow.css";

function CompanionWindow({ companions }) {
  return (
    <div className="CompanionWindow">
      {companions.map((companion, index) => (
        <div key={index} className={`CompanionCard ${companion.name.toLowerCase()}`}>
          <img src={companion.thumbnail} alt={`${companion.name}'s profile`} className="CompanionCard-thumbnail" />
          <div className="CompanionCard-info">
            <h3 className="CompanionCard-name">{companion.name}</h3>
            <p className="CompanionCard-stats">Body: {companion.body}</p>
            <p className="CompanionCard-stats">Mind: {companion.mind}</p>
            <p className="CompanionCard-stats">Soul: {companion.soul}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompanionWindow;