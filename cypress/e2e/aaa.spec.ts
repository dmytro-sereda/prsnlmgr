describe("Test", () => {
  it("Works", () => {
    const projectId = Cypress.env("PROJECT_ID");
    const test = Cypress.env("TEST_VARIABLE");
    const anotherTest = Cypress.env("ANOTHER_TEST_VARIABLE");
    expect(test).to.equal(200);
    expect(anotherTest).to.equal("prsnlmgr-713a4");
    // expect(projectId).to.equal("prsnlmgr");
  });
});
