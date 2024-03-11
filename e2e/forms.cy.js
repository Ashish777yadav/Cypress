describe("form-test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/forms");
  });
  it("", () => {
    cy.contains(/Testing Forms/);
    cy.contains("Successfully subbed: hello@gmail.com!").should("not.exist");
    cy.getDataTest("subscribe", "data-test")
      .find("input")
      .as("subscribe-input");
    cy.get("@subscribe-input").type("hello@gmail.com");
    cy.getDataTest("subscribe-button", "data-test").click();
    cy.contains("Successfully subbed: hello@gmail.com!").should("exist");
    // cy.wait(3000);
    cy.contains("Successfully subbed: hello@gmail.com!", {
      timeout: 3000,
    }).should("not.exist");
    cy.get("@subscribe-input").type("hello@gmail.io");
    cy.getDataTest("subscribe-button", "data-test").click();
    cy.contains(/invalid/i).should("exist");
    cy.wait(3000);
    cy.getDataTest("subscribe-button", "data-test").click();
    cy.get(
      '[data-test="accordion-item-1"] > #panel1a-header > .MuiAccordionSummary-content'
    ).click();
  });
});
