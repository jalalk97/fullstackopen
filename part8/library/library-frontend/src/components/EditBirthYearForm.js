import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, SET_AUTHOR_BIRTH_YEAR } from "../queries";

const EditBirthYearForm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

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
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">year</label>
          <input
            id="year"
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <p>
          <button>update author</button>
        </p>
      </form>
    </>
  );
};
export default EditBirthYearForm;
