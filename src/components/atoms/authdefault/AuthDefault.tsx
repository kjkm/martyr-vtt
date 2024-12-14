import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

const AuthDefault: React.FC = () => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "", "");
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return null;
};

export default AuthDefault;
