describe("Authentication works as expected", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Login page displays error with incorrect credentials", () => {
    // Fill fields
    cy.get('[id="email"]').type("test123@gmail.com");
    cy.get('[id="email"]').should("have.value", "test123@gmail.com");
    cy.get('[id="password"]').type("password");
    cy.get('[id="password"]').should("have.value", "password");

    // Click button
    cy.contains("button", "Log in").click();

    // Display popup
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "Incorrect email or password, please try again");
  });

  it("Sign up page display an error for existing account", () => {
    cy.contains("a", "Sign up").click();

    cy.get("h2").should("have.text", "Sign up");

    // Fill fields
    cy.get('[id="email"]').type("test@gmail.com");
    cy.get('[id="email"]').should("have.value", "test@gmail.com");
    cy.get('[id="password"]').type("testtest");
    cy.get('[id="password"]').should("have.value", "testtest");

    // Click sign up button
    cy.contains("button", "Sign up").click();

    // Display popup
    cy.get('[data-cy="popup"]')
      .should("be.visible")
      .should("have.text", "User with this email already exists");
  });

  it("Successful sign in", () => {
    cy.authenticate();

    cy.get('[data-cy="sidebar"]').should("be.visible");
  });
});
