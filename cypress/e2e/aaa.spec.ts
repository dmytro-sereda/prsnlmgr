describe("Test", () => {
  it("Works", () => {
    const projectId = Cypress.env("PROJECT_ID");
    expect(projectId).to.equal("prsnlmgr-713a4");
  });
});
