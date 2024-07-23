const PersonForm = ( {submitHandler, nameChangeHandler, numberChangeHandler, newName, newNumber} ) => {
  return (
    <form onSubmit={submitHandler}>
    <div>
      name: <input value={newName} onChange={nameChangeHandler}></input>
    </div>
    <div>
      number: <input value={newNumber} onChange={numberChangeHandler}></input>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

export default PersonForm
