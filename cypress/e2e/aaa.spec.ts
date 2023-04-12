describe("first", () => {
  const testVar = Cypress.env("TEST_ACCOUNT_EMAIL");
  expect(testVar).to.equal("cypress-test@gmail.com");
});
