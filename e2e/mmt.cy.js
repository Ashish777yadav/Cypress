describe("Fundamentals", () => {
  it("first", () => {
    cy.visit(
      "https://www.goibibo.com/flights/air-PNQ-AYJ-20240409--1-0-0-E-D?",
      { headers: { "Accept-Encoding": "gzip,deflate" } }
    );
    cy.wait(30000);
    cy.scrollTo(0, 500);
    cy.get(
      ".filtersstyles__FilterTypeWrap-sc-1hyeel5-9 edkcNj > .flexCol > .justifyBetween >  .font14 "
    );
  });
});
