/// <reference types="cypress" />
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyD19r3fIf12BbpqEellsZmfQwZXnGNViEw",
  authDomain: "prsnlmgr-713a4.firebaseapp.com",
  databaseURL: "https://prsnlmgr-713a4-default-rtdb.firebaseio.com",
  projectId: "prsnlmgr-713a4",
  storageBucket: "prsnlmgr-713a4.appspot.com",
  messagingSenderId: "508479827792",
  appId: "1:508479827792:web:eca968a4a7127406024655",
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
