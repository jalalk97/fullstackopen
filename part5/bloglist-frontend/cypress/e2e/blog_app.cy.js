describe("Blog app", function () {
  beforeEach(function () {
    const user = {
      name: "Big Bob",
      username: "bigbob1256",
      password: "6521bobgib",
    };

    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form").find("input").should("have.length", 2);

    cy.get("form").find("label").contains("username");
    cy.get("form").find("label").contains("password");
    cy.get("form").find("button").contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='username']").type("bigbob1256");
      cy.get("input[name='password']").type("6521bobgib");
      cy.contains("login").click();
      cy.contains("Big Bob logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='username']").type("bigbob1256");
      cy.get("input[name='password']").type("bigbob1256");
      cy.contains("login").click();
      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
