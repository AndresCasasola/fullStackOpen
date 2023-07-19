import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import PersonsView from './components/personsview'
import personsService from './services/persons'

const App = () => {
  const [ personsAll, setPersonsAll ] = useState([])
  const [ personsFiltered, setPersonsFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName] = useState('')
  
  const fetchPersonsFromServer = () => {
    personsService.getAll().then(initPersons => {
      setPersonsAll(initPersons)
      setPersonsFiltered(personsAll.filter(pers => pers.name.toLowerCase().includes(filterName.toLowerCase())))
    })
  }

  const handleFilterNameChange = (event) => setFilterName(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const personIsRegistered = () => personsAll.some(pers => pers.name === newName)
  const personNumberIsDifferent = () => personsAll.some(pers => pers.name === newName && pers.number !== newNumber)
  const userConfirmUpdateNumber = () => window.confirm(`"${newName}" is already registered. Do your want to update the number from "${personsAll.find(pers => pers.name === newName).number}" to "${newNumber}"?`)
  
  const updatePersonNumber = () => {
    const person = personsAll.find(pers => pers.name === newName)
    const changedPerson = {...person, number: newNumber}
    personsService
      .updatePerson(person.id, changedPerson)
      .then(updatedPerson => {
        setPersonsAll(personsAll.map(pers => pers.name === newName ? updatedPerson : pers))
      })
      .catch(error => {
        alert(`There was an error updating number: ${error}`)
      })
    alert(`"Number of "${newName}" updated to "${newNumber}" :)`)
  }

  const createPerson = () => {
    const newPersonObject = {
      id:personsAll.length+1,
      name: newName, 
      number: newNumber
    }
    personsService
      .createPerson(newPersonObject)
      .then(createdPerson => {
        setPersonsAll(personsAll.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setFilterName('')
      })
      .catch(error => {
        alert(`There was an error adding ${newPersonObject.name}`)
      })
  }

  const deletePerson = (id) => {
    console.log('Deleting person with id: ', id)
    const person = personsAll.find(pers => pers.id === id)
    if(window.confirm(`Do you really want to delete ${person.name}?`)){
      personsService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersonsAll(personsAll.filter(pers => pers.id !== id))
        })
    }
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    fetchPersonsFromServer()
    if(personIsRegistered())
    {
      if(personNumberIsDifferent())
      {
        if(!userConfirmUpdateNumber())
          return
        updatePersonNumber()
      }else{
        alert(`"${newNumber}" is the current number for "${newName}". Pick another :)`)
      }
    }else{
      createPerson()
    }
  }

  useEffect(() => fetchPersonsFromServer, [])
  useEffect(() => {
    setPersonsFiltered(personsAll.filter(pers => pers.name.toLowerCase().includes(filterName.toLowerCase())))
  }, [personsAll, filterName])

  return (
    <div>
      <h2 style={{ textIndent: "10px" }}>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={addNewPerson}/>
      <PersonsView persons={personsFiltered} fetchPersonsFromServer={fetchPersonsFromServer} deletePerson={deletePerson}/>
    </div>
  )
}

export default App