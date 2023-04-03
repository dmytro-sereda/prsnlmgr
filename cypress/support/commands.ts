/// <reference types="cypress" />

Cypress.Commands.add("authenticate", () => {
  cy.visit("/login");

  // Fill fields
  cy.get('[id="email"]').type("test@gmail.com");
  cy.get('[id="email"]').should("have.value", "test@gmail.com");
  cy.get('[id="password"]').type("testtest");
  cy.get('[id="password"]').should("have.value", "testtest");

  // Click button
  cy.contains("button", "Log in").click();
});
