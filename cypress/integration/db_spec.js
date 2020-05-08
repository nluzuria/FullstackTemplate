describe("Test general writing and reading fo database", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Can add a book entry", () => {
    cy.contains("h1", "Great success!");
  });

  it("Can retrieve the book entry", () => {
    cy.get('nav a[href*="about"]').click();
    cy.url().should("include", "/about");
  });
});
