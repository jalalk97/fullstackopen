import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";
import useNotification from "./hooks/useNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, notify] = useNotification("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) =>
      p.name.toLowerCase().includes(newName.toLowerCase())
    );
    if (person != null) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            );
            setNewName("");
            setNewNumber("");
            notify({ message: `Updated ${newName}`, isError: false });
          })
          .catch((error) => {
            notify({
              message: `Information of ${newName} has already been removed from server`,
              isError: true,
            });
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        notify({ message: `Added ${newName}`, isError: false });
      });
    }
  };

  const deletePerson = (id) => () => {
    const errMsg = "This person has already been deleted";
    const person = persons.find((person) => person.id === id);
    if (person == null) {
      alert(errMsg);
      return;
    }
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== id));
          notify({
            message: `Deleted ${person.name}`,
            isError: false,
          });
        })
        .catch((error) => {
          alert(errMsg);
          setPersons(persons.filter((p) => p.id !== id));
          notify({
            message: `Information of ${person.name} has already been deleted`,
            isError: true,
          });
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification} />
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
