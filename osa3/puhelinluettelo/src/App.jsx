import { useEffect, useState } from 'react'
import phoneService from './services/phonebook'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const defaultNotification = {message: '', success: true}
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(defaultNotification)

  const setDefaultNote = () => setTimeout(() => setNotification(defaultNotification), 5000)

  useEffect(() => {
    phoneService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(p => p.name === newName)
    if (newName === '' || newNumber === '') {
      setNotification(defaultNotification)
      setDefaultNote()
    } else if (oldPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneService.update({...oldPerson, number: newNumber}).then(() => {
          phoneService.getAll().then(response =>
            setPersons(response.data)
          )
          setNotification({message: `Updated ${newName}'s phone number!`, success: true})
          setDefaultNote()
        }).catch(error => {
          if (error.response.status === 404) setNotification({message: `Unable to find user ${newName} to update`, success: false})
          else setNotification({message: `Updating failed with code ${error.response.status}: ${error.response.data.error}`, success: false})
          setDefaultNote()
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phoneService.create(newPerson)
        .then(response => {
          setPersons(persons.concat([response]))
          setNewName('')
          setNewNumber('')
          setNotification({message: `Added ${newName}!`, success: true})
          setDefaultNote()
        }).catch(error => {
          setNotification({message: `Adding ${newName} failed with code ${error.response.status}: \n${error.response.data.error}`, success: false})
          setDefaultNote()
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}></Notification>
      <Filter filterHandler={handleFilterChange} filterName={filterName} />
      <h2>Add a new person</h2>
      <PersonForm
        submitHandler={handleSubmit}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        />
      <h2>Numbers</h2>
      <PersonList persons={persons} setPersonState={setPersons} filterName={filterName} />
    </div>
  )

}

export default App