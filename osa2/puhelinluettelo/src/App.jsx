import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };

      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);

    if (!personToDelete) {
      alert(`Person with id ${id} not found.`);
      return;
    }

    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearch={(event) => setSearchTerm(event.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} searchTerm={searchTerm} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
