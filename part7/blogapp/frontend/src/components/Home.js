import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createBlog, selectAllBlogs } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";

import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const blogFormRef = useRef();

  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap();
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(notify("creating a blog failed: " + error.message, "alert"));
    }
  };

  const style = {
    padding: 7,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <main>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          onCreate={onCreateBlog}
          onCancel={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
          {blogs.map((blog) => (
            <Box key={blog.id} p={3}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`by ${blog.author}`}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/blogs/${blog.id}`}
                    >
                      See blog
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
