describe("first", () => {
  it("works", () => {
    const testVar = Cypress.env("FIREBASE_API_KEY");
    expect(testVar).to.equal("AIzaSyD19r3fIf12BbpqEellsZmfQwZXnGNViEw");
  });
});
