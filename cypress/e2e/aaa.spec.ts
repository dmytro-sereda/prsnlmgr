describe("Environment variables", () => {
  it("should be able to access environment variables", () => {
    const FIREBASE_API_KEY = Cypress.env("FIREBASE_API_KEY");
    const PROJECT_ID = Cypress.env("PROJECT_ID");
    const FIREBASE_APP_ID = Cypress.env("FIREBASE_APP_ID");

    cy.log(`FIREBASE_API_KEY: ${FIREBASE_API_KEY}`);
    cy.log(`PROJECT_ID: ${PROJECT_ID}`);
    cy.log(`FIREBASE_APP_ID: ${FIREBASE_APP_ID}`);
  });
});
