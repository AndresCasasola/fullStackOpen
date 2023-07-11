import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import axios from 'axios'

const App = () => 
{
  const [ personsAll, setPersonsAll ] = useState([])
  const [ personsFiltered, setPersonsFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName] = useState('')
  
  const handleFilterNameChange = (event) => 
  {
    setFilterName(event.target.value)
    //const newPersonsFilt = personsAll.filter(pers => pers.name.includes(event.target.value))
    const newPersonsFilt = personsAll.filter(pers => pers.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersonsFiltered(newPersonsFilt)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) =>
  {
    event.preventDefault()

    if(personsAll.some(pers => pers.name === newName || pers.number === newNumber))
    {
      alert(`Name ${newName} or number ${newNumber} are already added to phonebook`)
    }
    else
    {
      const newPerson = 
      {
        id:personsAll.length+1,
        name: newName, 
        number: newNumber
      }
      setPersonsAll(personsAll.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setFilterName('')
    }
}

  useEffect( () => 
  {
    console.log('Execute effect')
    axios.get('http://localhost:3001/persons').then(response =>
    {
      setPersonsAll(response.data)
      setPersonsFiltered(response.data)
    })
  }, [])

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