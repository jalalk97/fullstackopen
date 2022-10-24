const mostLikes = require("../utils/list_helper").mostLikes;
const blogLists = require("./blogLists");

describe("mostLikes", () => {
  test("when a list contains only one blog is the author of that blog with its the number likes", () => {
    const result = mostLikes(blogLists.listWithOneBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("when a list contains many blogs is calculated right", () => {
    const result = mostLikes(blogLists.listWithManyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when a list is is empty returns null", () => {
    const result = mostLikes(blogLists.emptyList);
    expect(result).toEqual(null);
  });
});
