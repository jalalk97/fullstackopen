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
      cy.get("input[name=username]").type("bigbob1256");
      cy.get("input[name=password]").type("6521bobgib");
      cy.contains("login").click();
      cy.contains("Big Bob logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name=username]").type("bigbob1256");
      cy.get("input[name=password]").type("bigbob1256");
      cy.contains("login").click();
      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input[name=username]").type("bigbob1256");
      cy.get("input[name=password]").type("6521bobgib");
      cy.contains("login").click();

      cy.contains("button", "new blog").click();
      cy.get("input[name=title]").type("Existing Blog Title");
      cy.get("input[name=author]").type("Existing Blog Author");
      cy.get("input[name=url]").type("https://www.existing.com");
      cy.get("form").submit();
    });

    it("A blog can be created", function () {
      cy.contains("button", "new blog").click();
      cy.get("input[name=title]").type("Blog Title");
      cy.get("input[name=author]").type("Blog Author");
      cy.get("input[name=url]").type("https://www.blog.com");
      cy.get("form").submit();
      cy.contains("a new blog Blog Title by Blog Author added");
    });

    it("An existing blog can be liked", function () {
      cy.contains("Existing Blog Title Existing Blog Author")
        .contains("view")
        .click();

      cy.contains("likes")
        .contains("like")
        .click()
        .parent()
        .should("contain", "1");
    });

    it("The user who creates a blog can delete it", function () {
      cy.contains("Existing Blog Title Existing Blog Author")
        .contains("view")
        .click()
        .parent()
        .parent()
        .contains("remove")
        .click();

      cy.get("#blog-list").should(
        "not.contain",
        "Existing Blog Title Existing Blog Author"
      );
    });

    it.only("The blogs are ordered according to likes in descending order", function () {
      cy.contains("button", "new blog").click();
      cy.get("input[name=title]").type("The title with the second most likes");
      cy.get("input[name=author]").type("Second most liked author");
      cy.get("input[name=url]").type("https://www.secondmostliked.com");
      cy.get("form").submit();

      cy.contains("button", "new blog").click();
      cy.get("input[name=title]").type("The title with the most likes");
      cy.get("input[name=author]").type("Most liked author");
      cy.get("input[name=url]").type("https://www.mostliked.com");
      cy.get("form").submit();

      cy.contains(".blog", "The title with the second most likes")
        .contains("button", "view")
        .click()
        .parent()
        .contains("button", "like")
        .click()
        .click();

      cy.contains(".blog", "The title with the most likes")
        .contains("button", "view")
        .click()
        .parent()
        .contains("button", "like")
        .click()
        .click()
        .click()
        .click();

      cy.get(".blog").eq(0).should("contain", "The title with the most likes");
      cy.get(".blog")
        .eq(1)
        .should("contain", "The title with the second most likes");
    });
  });
});
