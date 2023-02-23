import { gql, useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";
import QueryResult from "./QueryResult";

const GET_CURRENT_USER_INFO = gql`
  query GetCurrentUserInfo {
    me {
      id
      username
      favouriteGenre
    }
  }
`;

const RecommendedBooks = () => {
  const currentUserResult = useQuery(GET_CURRENT_USER_INFO);
  const recommendationsResult = useQuery(GET_ALL_BOOKS, {
    variables: { genre: currentUserResult.data?.me.favouriteGenre },
  });

  return (
    <QueryResult
      loading={recommendationsResult.loading}
      error={recommendationsResult.error}
      data={recommendationsResult.data}
    >
      <QueryResult
        loading={currentUserResult.loading}
        error={currentUserResult.error}
        data={currentUserResult.data}
      >
        <h2>Recommendations</h2>
        <p>
          books in your favourite genre{" "}
          <b>{currentUserResult.data?.me.favouriteGenre}</b>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendationsResult.data?.allBooks.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </QueryResult>
    </QueryResult>
  );
};

export default RecommendedBooks;
