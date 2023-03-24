// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD19r3fIf12BbpqEellsZmfQwZXnGNViEw",
  authDomain: "prsnlmgr-713a4.firebaseapp.com",
  projectId: "prsnlmgr-713a4",
  storageBucket: "prsnlmgr-713a4.appspot.com",
  messagingSenderId: "508479827792",
  appId: "1:508479827792:web:eca968a4a7127406024655",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
