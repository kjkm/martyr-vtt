import { useState } from "react";
import "./ScriptWindow.css";

function ScriptWindow({ messages = [], onSendMessage }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue); // Debugging log
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="ScriptWindow">
      <div className="ScriptWindow-messages">
        {messages.map((message, index) => (
          <div key={index} className={`ScriptWindow-message ${message.type}`}>
            <div className="ScriptWindow-message-content">
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form className="ScriptWindow-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="ScriptWindow-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="ScriptWindow-sendButton">
          Send
        </button>
      </form>
    </div>
  );
}

export default ScriptWindow;
