import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Add type prop
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
  return (
    <button className="Button" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;