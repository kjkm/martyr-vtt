import ScriptWindow from "./ScriptWindow";
import "./ScriptWindow.css";

const messages = [
  { type: "user", content: "Hello, how can I help you?" },
  { type: "bot", content: "I need some information about your services." },
  { type: "user", content: "Sure, what would you like to know?" },
  { type: "bot", content: "Can you tell me more about your pricing?" },
  {
    type: "user",
    content:
      "Our pricing is based on the services you choose. Please visit our pricing page for more details.",
  },
];

export default <ScriptWindow messages={messages} />;
