/// <reference types="cypress" />
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { attachCustomCommands } from "cypress-firebase";

const apiKey = Cypress.env("FIREBASE_API_KEY");
const projectId = Cypress.env("FIREBASE_PROJECT_ID");
const appId = Cypress.env("FIREBASE_APP_ID");

const fbConfig = {
  apiKey,
  authDomain: `prsnlmgr-713a4.firebaseapp.com`,
  // authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://prsnlmgr-713a4-default-rtdb.firebaseio.com`,
  // databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  projectId: "prsnlmgr-713a4",
  // projectId,
  storageBucket: `prsnlmgr-713a4.appspot.com`,
  // storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "508479827792",
  appId,
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add("addRecords", (numberOfRecords: number) => {
  cy.contains("a", "Create an entry").click();

  for (let i = 1; i <= numberOfRecords; i++) {
    cy.get('[name="itemName"]').type(`Test Record ${i}`);
    cy.get('[name="amountPaid"]')
      .clear()
      .type(`${500 - (i - 1) * 100}`);
    cy.get('[name="date"]').type(`2023-05-0${i}`);
    cy.get('[name="category"]').select("Food");

    // Click submit button
    cy.contains("button", "Submit").click();
  }
});

Cypress.Commands.add("removeRecords", (numberOfRecordsToRemove: number) => {
  cy.get('[data-cy="deleteButton"]').each((button, index) => {
    if (index < numberOfRecordsToRemove) cy.wrap(button).click();
  });
});
