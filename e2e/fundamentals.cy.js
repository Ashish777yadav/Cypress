describe("Fundamentals ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fundamentals");
  });
  it("Header Test", () => {
    // cy.getDataTest("fundamentals-header").should(
    //   "contain.text",un
    //   "Testing Fundamentals"
    // );
    cy.get('[class ="fundamentals_header__yRsdA"]').should(
      "contain.text",
      "Testing Fundamentals"
    );
    // cy.get(".fundamentals_header__yRsdA").should(
    //   "contain.text",
    //   "Testing Fundamentals"
    // );
  });
  it("Accordion works correctly", () => {
    cy.contains(/Your tests will exist in a describe block/i).should(
      "not.be.visible"
    );
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should(
      "be.visible"
    );
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should(
      "not.be.visible"
    );
  });
});
