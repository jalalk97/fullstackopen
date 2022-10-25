const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const blogs = require("./blogLists").listWithManyBlogs;

const api = supertest(app);

const initialBlogs = blogs.map((blog) => ({
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
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("all blogs returned have an id property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("a valid blog can be added", async () => {
    const newBlog = {
        title: "Blog title",
        author: "Blog author",
        url: "https://blog.com",
        likes: 11,
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs");

    const addedBlog = response.body[response.body.length-1];

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(addedBlog.title).toBe("Blog title");
    expect(addedBlog.author).toBe("Blog author");
    expect(addedBlog.url).toBe("https://blog.com");
    expect(addedBlog.likes).toBe(11);
})

test("when a blog is added without the likes property, the property defaults to zero", async () => {
    const newBlog = {
        title: "Blog title",
        author: "Blog author",
        url: "https://blog.com",
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs");

    const addedBlog = response.body[response.body.length-1];

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(addedBlog.likes).toBe(0);
})

afterAll(() => {
  mongoose.connection.close();
});
