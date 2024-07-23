const Filter = ( {filterHandler, filterName} ) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={filterHandler}></input>
    </div>
  )
}

export default Filter