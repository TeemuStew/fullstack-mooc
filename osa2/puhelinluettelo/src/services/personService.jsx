import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)
  const [removeMessage, setRemoveMessage] = useState(null)
  const [numberMessage, setNumberMessage] = useState(null)
  const [alreadyRemovedMessage, setAlreadyRemovedMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    const personInContacts = persons.find(person => person.name === newName)

    // if contact is already added to phonebook
    if (personInContacts) {
      if (window.confirm(`${newName} is already added to phonebook\nDo you want to update the old number with the new one?`)) {
        // changing number of existing contact
        const personWithUpdatedNumber = {...personInContacts, number: newNumber} 
        personService
          .changeNumber(personWithUpdatedNumber)
          .then(changedPerson => {
            setPersons(persons.map(p => p.id === personWithUpdatedNumber.id ? changedPerson : p))
            setNumberMessage(
              `Changed ${changedPerson.name}'s number`
            )
            setTimeout(() => {
              setNumberMessage(null)
            }, 5000)
          })
          .catch(error => {
            setAlreadyRemovedMessage(
              `Information of ${personWithUpdatedNumber.name} has already been removed from server`
            )
            setPersons(persons.filter(p => p.id !== personWithUpdatedNumber.id))
            setTimeout(() => {
              setAlreadyRemovedMessage(null)
            }, 5000) 
          })
          
          setNewName('')
          setNewNumber('')
      }
    } else {
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAddMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
        .catch(error => {
          setAlreadyRemovedMessage(error.response.data.error)
          setTimeout(() => {
            setAlreadyRemovedMessage(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
    }
  }


  const deleteContact = (person) => {
      const deletedContact = person
      if (window.confirm(`Delete ${deletedContact.name}`)) {
        personService
          .deleteContact(person)
          .then(response => {
            setRemoveMessage(
              `Removed ${person.name}`
            )
            setTimeout(() => {
              setRemoveMessage(null)
            }, 5000)
          })
          .catch(error => {
            setAlreadyRemovedMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setPersons(persons.filter(p => p.id !== person.id))
            setTimeout(() => {
              setAlreadyRemovedMessage(null)
            }, 5000)
            
          })
          
          setPersons(persons.filter(p => p.id !== deletedContact.id))
      }
  }

  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }


  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const handleNewFilter = (event) => {
    setNameFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} type='success' />
      <Notification message={removeMessage} type='success' />
      <Notification message={numberMessage} type='success' />
      <Notification message={alreadyRemovedMessage} type='error'/>

      <Filter filter={nameFilter} eventHandler={handleNewFilter} />

      <h3>add a new</h3>

      <PersonForm addContact={addContact}
        name={newName} 
        number={newNumber} 
        nameHandler={handleNewName} 
        numberHandler={handleNewNumber} 
      />

      <h3>Numbers</h3>

      <Persons key={persons.name} persons={persons} nameFilter={nameFilter} handleDeleteContact={deleteContact} />
    </div>
  )
}

export default App