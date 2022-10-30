const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const blogs = require("./blogLists").listWithManyBlogs;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let tokenAndId;
let initialBlogs;

const getValidTokenAndId = async () => {
  const user = {
    username: "bigbob1256",
    name: "Big Bob",
    password: "6521bobgib",
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);
  const savedUser = await User({
    username: user.username,
    name: user.name,
    passwordHash,
  }).save();
  const response = await api.post("/api/login").send(user);

  return {
    token: `Bearer ${response.body.token}`,
    id: savedUser._id,
  };
};

beforeAll(async () => {
  tokenAndId = await getValidTokenAndId();

  initialBlogs = blogs.map((blog) => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: tokenAndId.id,
  }));
});

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
  };

  await api
    .post("/api/blogs")
    .set("Authorization", tokenAndId.token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const addedBlog = response.body[response.body.length - 1];

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(addedBlog.title).toBe("Blog title");
  expect(addedBlog.author).toBe("Blog author");
  expect(addedBlog.url).toBe("https://blog.com");
  expect(addedBlog.likes).toBe(11);
});

test("when a blog is added without the likes property, the property defaults to zero", async () => {
  const newBlog = {
    title: "Blog title",
    author: "Blog author",
    url: "https://blog.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", tokenAndId.token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const addedBlog = response.body[response.body.length - 1];

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(addedBlog.likes).toBe(0);
});

test("a blog without a title property is not added", async () => {
  const newBlog = {
    author: "Blog author",
    url: "https://blog.com",
    likes: 11,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", tokenAndId.token)
    .send(newBlog)
    .expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a blog without a url property is not added", async () => {
  const newBlog = {
    title: "Blog title",
    author: "Blog author",
    likes: 11,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", tokenAndId.token)
    .send(newBlog)
    .expect(400);

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

describe("deleting a blog", () => {
  test("removes the right blog and responds with status 204", async () => {
    const newBlog = {
      title: "Blog to delete",
      author: "Author",
      url: "https://blog.com",
      likes: 5,
      user: tokenAndId.id,
    };

    const postResponse = await api
      .post("/api/blogs")
      .set("Authorization", tokenAndId.token)
      .send(newBlog)

    await api
      .delete(`/api/blogs/${postResponse.body.id}`)
      .set("Authorization", tokenAndId.token)
      .expect(204);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(titles).not.toContain("Blog to delete");
  });

  test("fails with status code 401 if a token is not provided", async () => {
    const newBlog = {
      title: "Blog to delete",
      author: "Author",
      url: "https://blog.com",
      likes: 5,
      user: tokenAndId.id,
    };

    const postResponse = await api
      .post("/api/blogs")
      .set("Authorization", tokenAndId.token)
      .send(newBlog)

    await api
      .delete(`/api/blogs/${postResponse.body.id}`)
      .expect(401);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(titles).toContain("Blog to delete");
  })
});

describe("updating a blog", () => {
  test("correctly updates the right blog", async () => {
    const response = await api.get("/api/blogs");
    const oldBlog = response.body[0];

    const updatedBlog = await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send({ likes: oldBlog.likes + 100 })
      .expect(200);

    expect(updatedBlog.body.id).toBe(oldBlog.id);
    expect(updatedBlog.body.likes).not.toBe(oldBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
