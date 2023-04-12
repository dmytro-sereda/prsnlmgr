describe("first", () => {
  it("works", () => {
    const testVar = Cypress.env("PROJECT_ID_TWO");
    expect(testVar).to.equal("prsnlmgr-713a4");
  });
});
