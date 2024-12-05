import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyALbu1kQ8P5iwazjdeUc_Mi-d3RmdVYORc",
  authDomain: "martyrvtt.firebaseapp.com",
  projectId: "martyrvtt",
  storageBucket: "martyrvtt.firebasestorage.app",
  messagingSenderId: "839948647912",
  appId: "1:839948647912:web:936651da1183f42199385d"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };