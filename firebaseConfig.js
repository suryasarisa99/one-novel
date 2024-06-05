import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAkqQYSy0mUK326NCG6FFllYO0Q0TPsQA",
  authDomain: "results-94c30.firebaseapp.com",
  projectId: "results-94c30",
  storageBucket: "results-94c30.appspot.com",
  messagingSenderId: "1000428286448",
  appId: "1:1000428286448:web:fb743eee4c36d61e202d35",
  measurementId: "G-S09JREBNWT",
};

// Initialize Firebase
export default function initFirebase() {
  initializeApp(firebaseConfig);
}
