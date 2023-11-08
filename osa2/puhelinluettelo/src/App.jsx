import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'; 
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

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

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            showNotification(`Updated ${newName}'s number`);
          })
          .catch(error => {
            console.error('Error:', error);
            showNotification('Error updating the number', true);
          });
        setNewName('');
        setNewNumber('');
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };

      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          showNotification(`Added ${newName}`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error:', error);
          showNotification('Error adding a new person', true);
        });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);

    if (!personToDelete) {
      showNotification(`Person not found`, true);
      return;
    }

    const confirmDelete = window.confirm(`Do you really want to delete ${personToDelete.name}?`);

    if (confirmDelete) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${personToDelete.name}`);
        })
        .catch(error => {
          console.error('Error:', error);
          showNotification('Error deleting the person', true);
        });
    }
  };

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification ? notification.message : null} isError={notification ? notification.isError : false} />

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