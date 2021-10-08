import React from 'react'

const Phonebook = (props) => {
  return (
    <>
      <h2>Phonebook</h2>
      <p>
        filter shown with
        <input onChange={props.handleFilterChange} />
      </p>
    </>
  )
}

export default Phonebook
