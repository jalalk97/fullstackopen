import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>{`Error: ${error.message}`}</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSubscription } from "@apollo/client";

import QueryResult from "./QueryResult";
import { BOOK_ADDED, GET_ALL_BOOKS } from "../queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({
      data: {
        data: { bookAdded },
      },
      client,
    }) => {
      console.log(bookAdded);
      alert(`Book ${bookAdded.title} by ${bookAdded.author.name} added!`);
      client.cache.modify({
        fields: {
          allBooks(books) {
            return books.concat(bookAdded);
          },
        },
      });

      // updateCache(
      //   client.cache,
      //   { query: GET_ALL_BOOKS, variables: { genre: selectedGenre } },
      //   bookAdded
      // );
    },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>books</h2>
      {selectedGenre ? (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      ) : (
        <p>in all genres</p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
          {data?.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button>
          <Link to="/books/new">add book</Link>
        </button>
      </p>
    </div>
      <div>
        {Array.from(new Set(data?.allBooks.flatMap((book) => book.genres))).map(
          (genre) => (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          )
        )}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </QueryResult>
  );
};

export default Books;
