// import { nanoid } from "nanoid";

describe("View entries section works as expected", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/createEntry");
    // cy.contains("a", "Analytics").click();
    cy.contains("a", "View entries").click();
  });

  // after(() => {
  //   cy.logout();
  // });
  it("Newly created item is displayed", () => {
    cy.get("h3").should("have.text", "Here are all your entries");
    cy.contains("No entries").should("be.visible");
    // const id = nanoid();
    // cy.callRtdb("set", "/entries/" + Cypress.env("TEST_UID") + "/" + id, {
    //   id,
    //   itemName: "Test Name",
    //   amountPaid: 1000,
    //   date: 1200909212,
    //   category: "rent",
    //   additionalInfo: "Some info",
    // });

    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((item) => {
        cy.wrap(item).get("span").eq(0).should("have.text", "Test Record");
        cy.wrap(item).get("span").eq(1).should("have.text", "$1000.00");
        cy.wrap(item).get("span").eq(2).should("have.text", "1 Mar 2023");
        cy.wrap(item).get("span").eq(3).should("have.text", "food");
        cy.wrap(item)
          .get("span")
          .eq(4)
          .should("have.text", "This is some additional information");
      });
  });
  it.only("Newly created item can be modified", () => {
    cy.get('[data-cy="editButton"]').click();

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
        cy.wrap(item).get("input").eq(2).type("2023-04-04");
        cy.wrap(item).get("select").select("electronics");

        // Press button
        cy.get('[data-cy="doneButton"]').click();
      });

    cy.get('[data-cy="entry"]')
      .eq(0)
      .within((item) => {
        cy.wrap(item).get("span").eq(0).should("have.text", "Updated record");
        cy.wrap(item).get("span").eq(1).should("have.text", "$1200.00");
        cy.wrap(item).get("span").eq(2).should("have.text", "4 Apr 2023");
        cy.wrap(item).get("span").eq(3).should("have.text", "electronics");
        cy.wrap(item).get("span").eq(4).should("have.text", "");
      });
  });
  //   it("Newly created item can be removed", () => {});
  //   it("Pagination is displayed in the case of too many records", () => {});
  //   it("Pagination can be changed based on the value selected", () => {});
  //   it("Entries can be filtered", () => {});
});
