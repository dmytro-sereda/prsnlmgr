describe("Profile route works", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="profileButton"]').click();
    cy.contains("a", "Profile").click();
  });

  //   after(() => {
  //     cy.logout();
  //   });
  it("Name change works", () => {
    // Assert name
    cy.get('[data-cy="userName"]').should("have.text", "Unknown");

    // Change name
    cy.get('[data-cy="editNameButton"]').click();
    cy.get('[data-cy="editNameInput"]').type("New Name");
    cy.get('[data-cy="saveNameButton"]').click();

    // Assert name change
    cy.get('[data-cy="userName"]').should("have.text", "New Name");

    // Bring the Unknown name back
    cy.get('[data-cy="editNameButton"]').click();
    cy.get('[data-cy="editNameInput"]').type("Unknown");
    cy.get('[data-cy="saveNameButton"]').click();
  });
  it("Email unverified is displayed", () => {
    cy.get('[data-cy="emailText"]').should(
      "have.css",
      "color",
      "rgb(175, 0, 0)"
    );

    cy.get('[data-cy="isVerifiedText"]').should(
      "have.css",
      "color",
      "rgb(175, 0, 0)"
    );
  });
  it.only("Password update works", () => {
    // Errors for short passwords are handled
    cy.get('[name="newPassword"]').type("Test");
    cy.contains("button", "Update").click();
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "💥 Please fix the errors above");
    cy.get('[data-cy="newPasswordError"]').should(
      "have.text",
      "Password must be at least 8 characters long"
    );

    // Errors for short non matching passwords are handled
    cy.get('[name="newPassword"]').clear().type("NewPassword");
    cy.get('[name="confirmNewPassword"]').type("NewPasswor");
    cy.contains("button", "Update").click();
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "💥 Please fix the errors above");
    cy.get('[data-cy="confirmNewPasswordError"]').should(
      "have.text",
      "Passwords must match"
    );

    // Successful password change
    cy.get('[name="confirmNewPassword"]').type("d");
    cy.contains("button", "Update").click();
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "✅ Password has been updated");

    // Revert password back
    cy.get('[name="newPassword"]')
      .clear()
      .type(Cypress.env("TEST_ACCOUNT_PASSWORD"));
    cy.get('[name="confirmNewPassword"]')
      .clear()
      .type(Cypress.env("TEST_ACCOUNT_PASSWORD"));
    cy.contains("button", "Update").click();
  });
});
