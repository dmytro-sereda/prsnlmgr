describe("first", () => {
  it("works", () => {
    const test = Cypress.env("FIREBASE_PROJECT_ID");
    expect(test).to.equal("prsnlmgr-713a4");
  });
});
