import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.map((p) => p.name.toLowerCase()).includes(newName.toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => () => {
    const person = persons.find((person) => person.id === id);
    console.log(id, person);
    if (window.confirm(`Delete ${person.name} ?`)) {
      console.log("delete confirmed");
      personService
        .remove(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => alert("This person has already been deleted"));
    } else {
      console.log("delete cancelled");
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
