describe("Creating entry works as expected with validation", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/createEntry");
  });

  after(() => {
    cy.contains("a", "View entries").click();
    cy.removeRecords(1);
    cy.logout();
  });

  it("Validation on all fields", () => {
    cy.contains("h2", "Create entry");
    cy.contains("button", "Submit").click();

    // Error messages displayed
    cy.get('[data-cy="itemNameError"]').should("be.visible");
    cy.get('[data-cy="amountPaidError"]').should("be.visible");
    cy.get('[data-cy="dateError"]').should("be.visible");
    cy.get('[data-cy="categoryError"]').should("be.visible");

    // Popup displayed
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "💥 Please fix the errors above");
  });

  it("Successful creation", () => {
    // Fill inputs
    cy.get('[name="itemName"]').type("Test Record");
    cy.get('[name="itemName"]').should("have.value", "Test Record");
    cy.get('[name="amountPaid"]').clear().type("1000aksaksa");
    cy.get('[name="amountPaid"]').should("have.value", "1000");
    cy.get('[name="date"]').type("2023-03-02");
    cy.get('[name="date"]').should("have.value", "2023-03-02");
    cy.get('[name="category"]').select("Food");
    cy.get('[name="category"]').should("have.value", "food");
    cy.get('[name="additionalInfo"]').type(
      "This is some additional information"
    );
    cy.get('[name="additionalInfo"]').should(
      "have.value",
      "This is some additional information"
    );

    // Click submit button
    cy.contains("button", "Submit").click();

    // Popup displayed
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "✅ Claim successfully added");
  });
});
