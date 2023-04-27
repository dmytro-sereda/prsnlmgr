describe("Analytics page works correctly", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit("/analytics");
    cy.contains("a", "Analytics").click();
  });

  after(() => {
    cy.logout();
  });

  it("Displays 'not available' texts", () => {
    // Assert pie chart
    cy.get('[data-cy="pieChartContainer"]').should(
      "contain.text",
      "Sorry. There is no data for this time period"
    );

    // Assert single value Amount chart
    cy.get('[data-cy="singleValueAmount"]').should(
      "contain.text",
      "Last month $0.00k spent"
    );

    // // Assert single value Category chart
    cy.get('[data-cy="singleValueCategory"]').should(
      "contain.text",
      "You haven't spent anything last month"
    );
  });
});
