const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user._id,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  response.json(blog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (request.user.id !== blog.user.toString()) {
    return response.status(401).json({
      error: "permission denied"
    })
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidator: true }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
