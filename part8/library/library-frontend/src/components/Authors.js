import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditAuthorForm from "./EditAuthorForm";

const Authors = ({ token }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>`Error: ${error.message}`</div>;
  }

  const authors = data.allAuthors;

  return (
    <div>
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
          {authors.map((a) => (
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <EditAuthorForm />}
    </div>
    </QueryResult>
  );
};

export default Authors;
