describe("first", () => {
  it("", () => {
    cy.visit(" http://localhost:3000/examples");
    cy.get("input").type("hii");
    cy.get('[style="margin:20px"] > .MuiButtonBase-root').click();
    cy.wait(3000);
    cy.get("li > .MuiButtonBase-root").click();
  });
});
