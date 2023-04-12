describe("first", () => {
  it("works", () => {
    const testVar = Cypress.env("TEST_ACCOUNT_PASSWORD");
    expect(testVar).to.equal("cypresstest");
  });
});
