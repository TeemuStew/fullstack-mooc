import DeleteButton from './DeleteButton'
import Person from './Person'
import Notification from './Notification'
import phoneService from '../services/phonebook'
import { useState } from 'react'

const PersonList = ({ persons, filterName, setPersonState }) => {
  const defaultNotification = {message: '', success: true}
  const [notification, setNotification] = useState(defaultNotification)

  const deleteHandler = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        phoneService.remove(person)
          .then(response => {
            console.log(response)
            phoneService.getAll().then(response => setPersonState(response.data))
            setNotification({message: `Successfully deleted ${person.name}`, success: true})
            setTimeout(() => setNotification(defaultNotification), 5000)
          }
          ).catch(error => {
            setNotification({message: `Unable to delete ${person.name} due to code ${error.response.status} (Was user already deleted?)`, success: false})
            setTimeout(() => setNotification(defaultNotification), 5000)
          })
      }
    }
  }

  return (
    <>
      <Notification notification={notification}></Notification>
      {persons.filter(p => p.name.toLowerCase().includes(filterName)).map((person) =>
        <div key={person.id} style={{ display: 'flex', alignItems: 'left' }}>
          <Person name={person.name} number={person.number}></Person>
          &nbsp;
          <DeleteButton deleteHandler={deleteHandler(person)}></DeleteButton>
        </div>
      )}
    </>
  )
}

export default PersonList