describe("View entries section works as expected", () => {
  before(() => {
    cy.login();
    cy.visit("/createEntry");
    // Create test records
    cy.addRecords(5);
  });

  beforeEach(() => {
    cy.visit("/createEntry");
    cy.contains("a", "View entries").click();
  });

  after(() => {
    // Remove test records
    cy.removeRecords(5);

    // Logout
    cy.logout();
  });
  it("Newly created item is displayed", () => {
    cy.get("h3").should("have.text", "Here are all your entries");

    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((item) => {
        cy.wrap(item).get("span").eq(0).should("have.text", "Test Record");
        cy.wrap(item).get("span").eq(1).should("have.text", "$1000.00");
        cy.wrap(item).get("span").eq(2).should("have.text", "2 Mar 2023");
        cy.wrap(item).get("span").eq(3).should("have.text", "food");
        cy.wrap(item)
          .get("span")
          .eq(4)
          .should("have.text", "This is some additional information");
      });
  });
  it("Newly created item can be modified", () => {
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) => cy.wrap(entry).get('[data-cy="editButton"]').click());

    // Check the change of all spans to inputs
    cy.get('[data-cy="doneButton"]').should("be.visible");

    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((item) => {
        cy.wrap(item).get("input").eq(0).clear();
        cy.wrap(item).get("input").eq(1).clear();
        cy.wrap(item).get("input").eq(2).clear();
        cy.wrap(item).get("select").select("");
        cy.wrap(item).get("textarea").clear();

        // Press button
        cy.get('[data-cy="doneButton"]').click();

        // Check errors
        cy.wrap(item)
          .get("input")
          .each((input) =>
            cy
              .wrap(input)
              .should("have.css", "border", "2px solid rgb(255, 0, 0)")
          );
        cy.wrap(item)
          .get("select")
          .should("have.css", "border", "2px solid rgb(255, 0, 0)");

        // Supply updated values
        cy.wrap(item).get("input").eq(0).type("Updated record");
        cy.wrap(item).get("input").eq(1).type("1200");
        cy.wrap(item).get("input").eq(2).type("2023-03-04");
        cy.wrap(item).get("select").select("electronics");

        // Press button
        cy.get('[data-cy="doneButton"]').click();
      });

    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((item) => {
        cy.wrap(item).get("span").eq(0).should("have.text", "Updated record");
        cy.wrap(item).get("span").eq(1).should("have.text", "$1200.00");
        cy.wrap(item).get("span").eq(2).should("have.text", "4 Mar 2023");
        cy.wrap(item).get("span").eq(3).should("have.text", "electronics");
        cy.wrap(item).get("span").eq(4).should("have.text", "");
      });
  });

  it("Pagination is displayed in the case of too many records", () => {
    // Validate buttons
    cy.get('[data-cy="paginationButton"]').each((button, index) => {
      cy.wrap(button).should("have.text", index + 1);
    });

    cy.get('[data-cy="paginationButton"]')
      .eq(0)
      .should("have.css", "background-color", "rgb(99, 87, 132)");

    // Validate page change
    cy.get('[data-cy="paginationButton"]').eq(1).click();
    cy.get('[data-cy="paginationButton"]')
      .eq(1)
      .should("have.css", "background-color", "rgb(99, 87, 132)");
    cy.get('[data-cy="paginationButton"]')
      .eq(0)
      .should("have.css", "background-color", "rgb(240, 230, 239)");

    // Validate that record for the second page is present
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) =>
        cy.wrap(entry).get("span").eq(0).should("have.text", "Test Record 5")
      );
  });
  it("Pagination can be changed based on the value selected", () => {
    // Validate buttons
    cy.get('[data-cy="paginationButton"]').each((button, index) => {
      cy.wrap(button).should("have.text", index + 1);
    });
    cy.get('[data-cy="paginationButton"]').should("have.length", "2");
    cy.get('[data-cy="entry"]').should("have.length", "5");

    cy.get('[name="entriesPerPage"]').select("7");
    cy.get('[data-cy="entry"]').should("have.length", "6");
    cy.get('[data-cy="paginationButton"]').should("have.length", "0");
  });

  it("Newly created item can be removed", () => {
    // Validate the pagination buttons
    cy.get('[data-cy="paginationButton"]').should("have.length", "2");

    // Press delete button
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) =>
        cy.wrap(entry).get('[data-cy="deleteButton"]').click()
      );

    // Item should be removed and in its place a different entry
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) =>
        cy.wrap(entry).get("span").eq(0).should("have.text", "Test Record 1")
      );

    // Buttons should disappear
    cy.get('[data-cy="paginationButton"]').should("have.length", "0");
  });

  it("Entries can be filtered", () => {
    cy.get('[name="sortBy"]').select("Amount");

    // reverse the order based on the amount instead of date
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) =>
        cy.wrap(entry).get("span").eq(0).should("have.text", "Test Record 5")
      );

    // Swithc back to date
    cy.get('[name="sortBy"]').select("Date");

    // Now sort by date again
    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((entry) =>
        cy.wrap(entry).get("span").eq(0).should("have.text", "Test Record 1")
      );
  });
});
