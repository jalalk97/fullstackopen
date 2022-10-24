const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const blogLists = require("./blogLists");

describe("favoriteBlog", () => {
  test("of a list with one blog is that blog", () => {
    const result = favoriteBlog(blogLists.listWithOneBlog);
    expect(result).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    });
  });

  test("of a list with many blogs is calculated right", () => {
    const result = favoriteBlog(blogLists.listWithManyBlogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });

  test("of an empty list is null", () => {
    const result = favoriteBlog(blogLists.emptyList);
    expect(result).toEqual(null);
  });
});
