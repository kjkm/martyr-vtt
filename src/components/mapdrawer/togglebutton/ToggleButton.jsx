import "./ToggleButton.css";

function ToggleButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="ToggleButton">
      {children}
    </button>
  );
}

export default ToggleButton;
