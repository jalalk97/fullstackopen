import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_AUTHORS } from "../queries";
import QueryResult from "./QueryResult";

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      code
      success
      message
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`;

const GET_AUTHOR_NAMES = gql`
  query GetAuthorNames {
    allAuthors {
      id
      name
    }
  }
`;

const EditAuthor = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: { name, setBornTo: Number(year) },
  });

  const { loading, error, data } = useQuery(GET_AUTHOR_NAMES);

  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthor();
    setYear("");
    navigate("/authors");
  };

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              {data?.allAuthors.map((author) => (
                <option key={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="text"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </QueryResult>
  );
};

export default EditAuthor;
