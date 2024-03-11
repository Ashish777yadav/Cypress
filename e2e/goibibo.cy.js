function getDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toDateString();
}

function sortFairPrices(fairPrices) {
  const validPrices = fairPrices.filter((item) => item.price !== "N/A");

  validPrices.sort((a, b) => {
    const priceA = parseInt(a.price.replace(/,/g, ""));
    const priceB = parseInt(b.price.replace(/,/g, ""));

    if (priceA === priceB) {
      const dayOfWeekA = new Date(a.date).getDay();
      const dayOfWeekB = new Date(b.date).getDay();

      if (dayOfWeekA === 0 || dayOfWeekA === 6) {
        return -1; // Saturday or Sunday comes before other days
      } else if (dayOfWeekB === 0 || dayOfWeekB === 6) {
        return 1; // Saturday or Sunday comes after other days
      }
    }

    return priceA - priceB;
  });

  // Extract and return only the first date from the sorted array
  return validPrices.length > 0 ? validPrices[0].date : null;
}
describe("Goibibo", () => {
  it("Login", () => {
    cy.viewport(1500, 900);
    cy.visit("https://www.goibibo.com/");

    // close button of login
    cy.get(".logSprite").click();
    cy.wait(5000);

    //entering source
    cy.get(":nth-child(1) > .sc-12foipm-35 .sc-12foipm-16 ").click();
    cy.get(
      ":nth-child(1) > .sc-12foipm-35 > .sc-12foipm-37 > .sc-12foipm-38 > input[value]"
    )
      .focus()
      .clear()
      .type("Pune");
    cy.get('[tabindex="0"] > .sc-12foipm-42').click();

    //entering destination
    cy.get(".sc-12foipm-38 > input").focus().clear().type("Ayodhya");
    cy.get('[tabindex="0"] > .sc-12foipm-42').click();

    //selecting date after one month
    var departure = getDate();
    cy.get(
      `.DayPicker-Months > .DayPicker-Month > .DayPicker-Body > .DayPicker-Week > div[aria-label="${departure}"]`
    ).click();

    const fairPrices = [];
    cy.log("BEFROEEE");
    cy.wait(2000);
    // Iterate over the fair price elements for the 14 days after the departure date
    // Iterate over the fair price elements for the 14 days after the departure date
    for (let i = 1; i <= 14; i++) {
      // Calculate the date for the current iteration (departure date + i days)
      const currentDate = new Date(departure);
      currentDate.setDate(currentDate.getDate() + i);

      // Format the current date to match the expected format (e.g., "Fri Apr 05 2024")
      const formattedDate = currentDate.toDateString();

      // Get the date element for the current day
      const dateElement = cy.get(`[aria-label="${formattedDate}"]`);

      // Check if the date element exists and is not disabled
      dateElement.then(($dateElement) => {
        if ($dateElement.find(".fsw__price").length > 0) {
          // Get the fair price element for the current day
          const fairPriceElement = $dateElement.find(".fsw__price");

          // Get the text content of the fair price element and add it to the array
          const fairPrice = fairPriceElement.text().trim();
          fairPrices.push({ date: formattedDate, price: fairPrice });
        } else {
          // If fair price element doesn't exist, add a placeholder or handle it as needed
          fairPrices.push({ date: formattedDate, price: "N/A" }); // Placeholder value for no price
        }
      });
    }

    // Log only the prices from function having minimum price
    let leastPriceDate;
    cy.wrap(fairPrices).then((fairPrices) => {
      leastPriceDate = sortFairPrices(fairPrices);
      cy.log("Least price date:", leastPriceDate);
      cy.get(
        `.DayPicker-Months > .DayPicker-Month > .DayPicker-Body > .DayPicker-Week > div[aria-label="${leastPriceDate}"]`
      ).click();
    });

    //done selector
    cy.get(".fswTrvl__done").click();
    cy.get(".sc-12foipm-75 > a")
      .contains("Done")
      .click({ force: true })
      .wait(5000);

    //search flight
    cy.get(".sc-12foipm-85").click();

    // Selecting the first flight
    cy.wait(30000);
    cy.get("Button.srp-card-uistyles__BookButton-sc-3flq99-21")
      .contains(/Book|View Fares/i)
      .click()
      .wait(2000)
      .then(($button) => {
        if ($button.text().includes("HIDE FARE")) {
          cy.log("inside loop");
          cy.get(".srp-card-uistyles__Fltbook-sc-3flq99-35 ")
            .should("contain.value", "Book")
            .first()
            .click()
            .then(($button) => {
              // Intercept the click action to prevent the default behavior
              cy.wrap($button).invoke("removeAttr", "target").click();
              cy.url().then((currentUrl) => {
                cy.visit(currentUrl);
              });
            });
        }
      });
  });
});
