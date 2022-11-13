describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form").find("input").should("have.length", 2);

    cy.get("form").find("label").contains("username");
    cy.get("form").find("label").contains("password");
    cy.get("form").find("button").contains("login");
  });
});
