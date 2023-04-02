describe("Creating entry works as expected with validation", () => {
  beforeEach(() => {
    cy.visit("/createEntry");
  });
  it("Validation on all fields", () => {
    // Error messages displayed
    // Popup displayed
    expect(20).to.equal(20);
  });
  it("Successful creation", () => {
    // Popup displayed
  });
});
