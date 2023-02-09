import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditBirthYearForm from "./EditBirthYearForm";

const Authors = () => {
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
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthYearForm />
    </div>
  );
};

export default Authors;
