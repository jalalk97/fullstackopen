const totalLikes = require("../utils/list_helper").totalLikes;
const blogLists = require("./blogLists");

describe("totalLikes", () => {
  test("of a list with one blog is the number of likes of that blog", () => {
    const result = totalLikes(blogLists.listWithOneBlog);
    expect(result).toBe(7);
  });

  test("of a list with many blogs is calculated right", () => {
    const result = totalLikes(blogLists.listWithManyBlogs);
    expect(result).toBe(36);
  });

  test("of an empty list is zero", () => {
    const result = totalLikes(blogLists.emptyList);
    expect(result).toBe(0);
  });
});
