describe("Creating entry works as expected with validation", () => {
  beforeEach(() => {
    // cy.authenticate();
    cy.visit("/createEntry");
  });
  it.only("Validation on all fields", () => {
    cy.contains("h2", "Create entry");
    // cy.contains("h2", "Log in");
    // cy.contains("button", "Submit").click();
    // Error messages displayed

    // Popup displayed
    // cy.get('[data-cy="popup"]')
    //   .should("be.visible")
    //   .should("have.text", "💥 Please fix the errors above");
  });
  it("Successful creation", () => {
    // Popup displayed
  });
});
