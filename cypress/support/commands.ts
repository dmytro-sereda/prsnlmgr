/// <reference types="cypress" />
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { attachCustomCommands } from "cypress-firebase";

const apiKey = Cypress.env("FIREBASE_API_KEY");
const projectId = Cypress.env("PROJECT_ID");
const appId = Cypress.env("FIREBASE_APP_ID");

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https:/${projectId}-default-rtdb.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "508479827792",
  appId,
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
