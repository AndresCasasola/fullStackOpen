import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const data = [
  { 
    id: 1,
    name: 'Arto Hellas', 
    number: '111111111'
  },
  { 
    id: 2,
    name: 'Alberto Garcia',
    number: '222222222'
  },
  { 
    id: 3,
    name: 'Robert Pink',
    number: '333333333'
  },
  { 
    id: 4,
    name: 'Peter Robinson',
    number: '444444444'
  },
  { 
    id: 5,
    name: 'Alex Brown',
    number: '555555555'
  }
]

const App = () => 
{
  const [ persons, setPersons ] = useState(data)
  const [ personsFiltered, setPersonsFiltered ] = useState(data)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName] = useState('')
  
  const handleFilterNameChange = (event) => 
  {
    setFilterName(event.target.value)
    const newPersonsFilt = persons.filter(pers => pers.name.includes(event.target.value))
    setPersonsFiltered(newPersonsFilt)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) =>
  {
    event.preventDefault()

    if(persons.some(pers => pers.name === newName || pers.number === newNumber))
    {
      alert(`Name ${newName} or number ${newNumber} are already added to phonebook`)
    }
    else
    {
      const newPerson = 
      {
        id:persons.length+1,
        name: newName, 
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setFilterName('')
    }
}

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}/>
      <Persons persons={personsFiltered}/>
    </div>
  )
}

export default App