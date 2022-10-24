const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((sum, cur) => cur + sum, 0);

const favoriteBlog = (blogs) =>
  Object.keys(blogs).length === 0
    ? null
    : blogs.reduce((max, cur) => (cur.likes > max.likes ? cur : max));

const mostBlogs = (blogs) =>
  Object.keys(blogs).length === 0
    ? null
    : _.zipObject(
        ["author", "blogs"],
        _(blogs).countBy("author").entries().maxBy(_.last)
      );

const mostLikes = (blogs) =>
  Object.keys(blogs).length === 0
    ? null
    : _.zipObject(
        ["author", "likes"],
        _(blogs).groupBy("author").mapValues(totalLikes).entries().maxBy(_.last)
      );

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
