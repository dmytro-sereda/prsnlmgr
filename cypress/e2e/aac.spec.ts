describe("first", () => {
  it("works", () => {
    const testVar = Cypress.env("PROJECT_ID");
    expect(testVar).to.equal("prsnlmgr-713a4");
  });
});
