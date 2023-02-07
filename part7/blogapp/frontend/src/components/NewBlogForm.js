import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const NewBlogForm = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url, likes: 0 });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const items = [
    { label: "title", state: title, setState: setTitle },
    { label: "author", state: author, setState: setAuthor },
    { label: "url", state: url, setState: setUrl },
  ];

  return (
    <Card>
      <Typography variant="h2">Create new</Typography>
      <CardContent>
        <Grid container spacing={1}>
          {items.map((item) => (
            <Grid key={item.label} xs={12} item>
              <TextField
                id={item.label}
                value={item.state}
                onChange={(event) => item.setState(event.target.value)}
                label={item.label}
                placeholder={`Enter blog ${item.label}`}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          ))}
          <Grid xs={12} sm={6} item>
            <Button
              id="create-butto"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Create
            </Button>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={onCancel}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NewBlogForm;
