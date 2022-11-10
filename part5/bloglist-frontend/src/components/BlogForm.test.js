import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("the event handler is called with right details on submit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const titleField = container.querySelector(".titleField");
  const authorField = container.querySelector(".authorField");
  const urlField = container.querySelector(".urlField");
  const createButton = screen.getByText("create");

  await user.type(titleField, "Blog Title");
  await user.type(authorField, "Blog Author");
  await user.type(urlField, "https://www.blog.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Blog Title");
  expect(createBlog.mock.calls[0][0].author).toBe("Blog Author");
  expect(createBlog.mock.calls[0][0].url).toBe("https://www.blog.com");
});
