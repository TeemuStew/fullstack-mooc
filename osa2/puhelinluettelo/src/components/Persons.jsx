const Persons = ({ persons, nameFilter, handleDeleteContact }) => {
    return (
      <div>
        {persons.filter(p =>
            p.name.toLowerCase().includes(nameFilter.toLowerCase())
            ).map(person =>
              <div key={person.name}>
                <p>
                  {person.name} {person.number}&nbsp;
                  <button id={person.name} onClick={() => handleDeleteContact(person)}>delete</button>
                </p>
              </div>
        )}
      </div>
    )
}

export default Persons