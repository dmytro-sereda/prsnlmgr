describe("Test", () => {
  it("Works", () => {
    const projectId = Cypress.env("CYPRESS_PROJECT_ID");
    const test = Cypress.env("TEST_VARIABLE");
    const anotherTest = Cypress.env("ANOTHER_TEST_VARIABLE");
    expect(test).to.equal(200);
    expect(anotherTest).to.equal("hello");
    expect(projectId).to.equal("prsnlmgr");
  });
});
