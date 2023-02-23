import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../queries";
import QueryResult from "./QueryResult";

const Authors = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </QueryResult>
  );
};

export default Authors;
