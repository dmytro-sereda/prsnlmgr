describe("Environment variables", () => {
  it("should be able to access environment variables", () => {
    const FIREBASE_API_KEY = Cypress.env("FIREBASE_API_KEY");
    const PROJECT_ID = Cypress.env("PROJECT_ID");
    const FIREBASE_APP_ID = Cypress.env("FIREBASE_APP_ID");

    expect(FIREBASE_API_KEY).to.equal(
      "AIzaSyD19r3fIf12BbpqEellsZmfQwZXnGNViEw"
    );
    expect(PROJECT_ID).to.equal("prsnlmgr-713a4");
    expect(FIREBASE_APP_ID).to.equal(
      "1:508479827792:web:eca968a4a7127406024655"
    );
    cy.log(`FIREBASE_API_KEY: ${FIREBASE_API_KEY}`);
    cy.log(`PROJECT_ID: ${PROJECT_ID}`);
    cy.log(`FIREBASE_APP_ID: ${FIREBASE_APP_ID}`);
  });
});
