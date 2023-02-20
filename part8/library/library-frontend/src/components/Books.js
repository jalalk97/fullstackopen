import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";
import QueryResult from "./QueryResult";

const Books = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </QueryResult>
  );
};

export default Books;
