import React from 'react'

const Numbers = ({ persons, filter, deleteCallback }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) =>
        filter === '' ? (
          <Person
            key={person.name}
            person={person}
            deleteCallback={deleteCallback}
          />
        ) : person.name.toLowerCase().includes(filter.toLowerCase()) ? (
          <Person
            key={person.name}
            person={person}
            deleteCallback={deleteCallback}
          />
        ) : (
          ''
        )
      )}
    </>
  )
}

const Person = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
      <button onClick={() => props.deleteCallback(props.person)}>delete</button>
    </p>
  )
}

export default Numbers
