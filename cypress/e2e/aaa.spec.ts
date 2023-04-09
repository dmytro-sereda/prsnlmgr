describe("Test", () => {
  it("Works", () => {
    const test = Cypress.env("TEST_VARIABLE");
    expect(test).to.equal(20);
  });
});
