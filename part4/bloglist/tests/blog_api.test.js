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

test("a blog without a title property is not added", async () => {
  const newBlog = {
    author: "Blog author",
    url: "https://blog.com",
    likes: 11,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a blog without a url property is not added", async () => {
  const newBlog = {
    title: "Blog title",
    author: "Blog author",
    likes: 11,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

describe("fetching a single blog", () => {
  test("with a valid id returns as json", async () => {
    const response = await api.get("/api/blogs");
    const validId = response.body[0].id;

    await api
      .get(`/api/blogs/${validId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting a single blog", () => {
  test("removes the right blog and responds with status 204", async () => {
    const newBlog = {
      title: "Blog to delete",
      author: "Author",
      url: "https://blog.com",
      likes: 5,
    };

    const savedBlog = await api.post("/api/blogs").send(newBlog);

    await api.delete(`/api/blogs/${savedBlog.body.id}`).expect(204);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(titles).not.toContain("Blog to delete");
  });
});
  

afterAll(() => {
  mongoose.connection.close();
});
