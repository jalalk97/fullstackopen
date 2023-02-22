import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../queries";

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      code
      success
      message
      book {
        id
        title
        published
        author {
          id
          name
          born
          bookCount
        }
        genres
      }
    }
  }
`;

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const [addBook] = useMutation(ADD_BOOK, {
    variables: {
      title,
      author,
      published: Number(published),
      genres,
    },
    update(
      cache,
      {
        data: {
          addBook: { book },
        },
      }
    ) {
      const { allAuthors } = cache.readQuery({
        query: GET_ALL_AUTHORS,
      });
      cache.writeQuery({
        query: GET_ALL_AUTHORS,
        data: {
          allAuthors: [...allAuthors, book.author],
        },
      });
      console.log("after 1st cache.writeQuery()");

      const { allBooks } = cache.readQuery({
        query: GET_ALL_BOOKS,
        variables: {
          author: null,
          genre: null,
        },
      });
      console.log("after 2nd cache.readQuery()");
      cache.writeQuery({
        query: GET_ALL_BOOKS,
        data: {
          allBooks: [...allBooks, book],
        },
      });
      console.log("after 2nd cache.readQuery()");
    },
  });

  const submit = (event) => {
    event.preventDefault();

    addBook();
    navigate("/books");

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
