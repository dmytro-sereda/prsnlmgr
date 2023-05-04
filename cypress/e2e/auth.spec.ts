describe("Authentication works as expected", () => {
  beforeEach(() => {
    cy.logout();
    cy.visit("/login");
  });

  // after(() => {
  //   cy.logout();
  //   cy.contains("h2", "Log in").should("be.visible");
  // });
  it("Login page displays error with incorrect credentials", () => {
    // // Fill fields
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
    cy.visit("/login");

    // Fill fields
    cy.get('[id="email"]').type(Cypress.env("TEST_ACCOUNT_EMAIL"));
    cy.get('[id="email"]').should(
      "have.value",
      Cypress.env("TEST_ACCOUNT_EMAIL")
    );
    cy.get('[id="password"]').type(Cypress.env("TEST_ACCOUNT_PASSWORD"));
    cy.get('[id="password"]').should(
      "have.value",
      Cypress.env("TEST_ACCOUNT_PASSWORD")
    );

    // Click button
    cy.contains("button", "Log in").click();

    // Assert the successfull login
    cy.get('[data-cy="sidebar"]').should("be.visible");
  });

  it("Successfull sign up and account deletion", () => {
    const email = "testing.email@gmail.com";
    const password = "testpassword";

    // cy.login();
    cy.contains("a", "Sign up").click();

    // Create account
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.contains("button", "Sign up").click();

    // Enter new credentials

    // Travel to profile page
    cy.get('[data-cy="profileButton"]').click();
    cy.contains("a", "Profile").click();

    // Skip slide show
    cy.contains("button", "Next").click();
    cy.contains("div", "Create expense entries").within((item) =>
      cy.wrap(item).contains("button", "Next").click()
    );
    cy.contains("div", "Customize your profile. All in one place!").within(
      (item) => cy.wrap(item).contains("button", "Next").click()
    );
    cy.contains("div", "Easily manage your entries").within((item) =>
      cy.wrap(item).contains("button", "Next").click()
    );
    cy.contains(
      "div",
      "Dynamic charts provide helpful insights on your expenditures!"
    ).within((item) => cy.wrap(item).contains("button", "Done").click());

    // Validate correct email
    cy.get('[data-cy="emailText"]').should("have.text", email);

    // Delete account
    cy.get('[data-cy="deleteButton"]').click();
  });
});
