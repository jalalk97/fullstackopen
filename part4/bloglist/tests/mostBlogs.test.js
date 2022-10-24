const mostBlogs = require("../utils/list_helper").mostBlogs;
const blogLists = require("./blogLists");

describe("mostBlogs", () => {
  test("when a list contains only one blog is the author of that blog with a count of one", () => {
    const result = mostBlogs(blogLists.listWithOneBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });

  test("when a list contains many blogs is calculated right", () => {
    const result = mostBlogs(blogLists.listWithManyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("when a list is is empty returns null", () => {
    const result = mostBlogs(blogLists.emptyList);
    expect(result).toEqual(null);
  });
});
