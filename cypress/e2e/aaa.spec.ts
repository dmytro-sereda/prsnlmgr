describe("Test", () => {
  it("Works", () => {
    const test = Cypress.env("TEST_VARIABLE");
    const projectId = Cypress.env("PROJECT_ID");
    expect(test).to.equal(21);
    expect(projectId).to.equal("prsnlmgr-713a4");
  });
});
