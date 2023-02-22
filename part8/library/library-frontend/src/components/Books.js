import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";
import QueryResult from "./QueryResult";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  // const selectedBooks = selectedGenre
  //   ? data?.allBooks.filter((book) => book.genres.includes(selectedGenre))
  //   : data?.allBooks;

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
          {data?.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
