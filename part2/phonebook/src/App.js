import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const url = "http://localhost:3001/persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(url).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    axios.post(url, personObject).then((response) => {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        onClick={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
