const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const blogs = require("./blogLists").listWithManyBlogs;

const api = supertest(app);

const initialBlogs = blogs.map(blog => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
}));

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("all blogs returned have an id property", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => expect(blog.id).toBeDefined());
})

afterAll(() => {
  mongoose.connection.close();
});
