import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (year === "" && data?.allAuthors.length) {
      setName(data.allAuthors[0].name);
    }
  }, [year, data]);

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
                <option
                  key={author.id}
                  onChange={(event) => setName(event.target.value)}
                >
                  {author.name}
                </option>
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
