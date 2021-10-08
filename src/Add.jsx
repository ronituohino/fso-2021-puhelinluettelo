import React from 'react'

const Add = (props) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={props.addNewName}>
        <div>
          name:{' '}
          <input id='name' value={props.newName} onChange={props.handleNameChange} />
        </div>

        <div>
          number:{' '}
          <input id='number' number={props.newNumber} onChange={props.handleNumberChange} />
        </div>

        <div>
          <button id='add_button' type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default Add
