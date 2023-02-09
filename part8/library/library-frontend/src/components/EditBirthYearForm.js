import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, SET_AUTHOR_BIRTH_YEAR } from "../queries";

const EditBirthYearForm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [names, setNames] = useState([]);

  const results = useQuery(ALL_AUTHORS, {
    onCompleted: (data) =>
      setNames(data.allAuthors.map((author) => author.name)),
  });

  const [setAuthorBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await setAuthorBirthYear({ variables: { name, year: Number(year) } });

      setName("");
      setYear("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h3>Set birth year</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              {names.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            year
            <input
              type="text"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </label>
        </div>
        <p>
          <button>update author</button>
        </p>
      </form>
    </>
  );
};
export default EditBirthYearForm;
