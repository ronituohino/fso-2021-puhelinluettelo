import React, { useState, useEffect } from 'react'

import Notification from './Notification'
import Phonebook from './Phonebook'
import Add from './Add'
import Numbers from './Numbers'

import numbersService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [notification, setNotification] = useState({
    message: '',
    error: false,
  })

  // Fetch persons data from db.json with axios
  useEffect(() => {
    numbersService.all().then((result) => setPersons(result))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const existing = persons.find((p) => p.name === newName)

    // Check if person is already in numbers
    if (typeof existing !== 'undefined') {
      // Ask if we replace the contact number
      if (
        window.confirm(
          `${newName} is already added to phonebook, 
        replace the old number with a new one?`
        )
      ) {
        numbersService
          .replace(existing.id, newPerson)
          .then((data) => {
            setPersons(persons.map((p) => (p.id === data.id ? data : p)))

            showNotification(
              `Replaced ${newName}'s number with ${newNumber}`,
              false
            )
          })
          .catch((error) => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              true
            )
          })
      }
    } else {
      // If not, create new person
      numbersService
        .create(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson))

          showNotification(`Added ${newPerson.name}`, false)
        })
        .catch((error) => {
          showNotification(error.response.data.error, true)
        })
    }
  }

  const deleteExistingNumber = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      numbersService
        .del(person.id)
        .then((data) => {
          setPersons(persons.filter((p) => p.id !== person.id))

          showNotification(`Removed ${person.name}`, false)
        })
        .catch((error) => {
          showNotification(error.response.data.error, true)
        })
    }
  }

  /**
   * @param {string} message The message to display
   * @param {Boolean} error Is this an error message?
   */
  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(
      () => {
        setNotification({ message: '', error: false })
      },
      error ? 6000 : 3000
    )
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Phonebook handleFilterChange={handleFilterChange} />

      <Notification notification={notification} />

      <Add
        addNewName={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers
        persons={persons}
        filter={filter}
        deleteCallback={deleteExistingNumber}
      />
    </div>
  )
}

export default App