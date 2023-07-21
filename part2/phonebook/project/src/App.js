import './App.css'
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import PersonsView from './components/personsview'
import Notification from './components/notification'
import personsService from './services/persons'


const App = () => {
  const [ personsAll, setPersonsAll ] = useState([])
  const [ personsFiltered, setPersonsFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ infoMsgData, setInfoMsgData ] = useState( { msg: 'Empty', color: 'dimgrey' } )

  const fetchPersonsFromServer = () => {
    personsService
      .getAll()
      .then(initPersons => {
        setPersonsAll(initPersons)
        setPersonsFiltered(personsAll.filter(pers => pers.name.toLowerCase().includes(filterName.toLowerCase())))
      })
      .catch( error => {
        console.error('Error: ', error)
        setInfoMsg2Sec({
          msg: `Error fetching from server`,
          color: 'red'
        })
      })
  }

  const handleFilterNameChange = (event) => setFilterName(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const personIsRegistered = () => personsAll.some(pers => pers.name === newName)
  const personNumberIsDifferent = () => personsAll.some(pers => pers.name === newName && pers.number !== newNumber)
  const userConfirmUpdateNumber = () => window.confirm(`"${newName}" is already registered. Do your want to update the number from "${personsAll.find(pers => pers.name === newName).number}" to "${newNumber}"?`)
  
  const setInfoMsg2Sec = (msgData) => {
    setInfoMsgData(msgData)
    setTimeout(() => setInfoMsgData({ msg: 'Empty', color: 'dimgrey' }), 4000)
  }
  
  const updatePersonNumber = () => {
    const person = personsAll.find(pers => pers.name === newName)
    const changedPerson = {...person, number: newNumber}
    personsService
      .updatePerson(person.id, changedPerson)
      .then(updatedPerson => {
        setPersonsAll(personsAll.map(pers => pers.name === newName ? updatedPerson : pers))
        setInfoMsg2Sec({
          msg: `"Number of "${newName}" updated to "${newNumber}" :)`,
          color: 'green'
        })
      })
      .catch(error => {
        console.error('Error: ', error)
        setInfoMsg2Sec({
          msg: `There was an error updating number: ${error}`,
          color: 'red'
        })
      })
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
        setInfoMsg2Sec({
          msg: `"${newName}" added!`,
          color: 'green'
        })
      })
      .catch(error => {
        console.error('Error: ', error)
        setInfoMsg2Sec({
          msg: `There was an error adding ${newPersonObject.name}`,
          color: 'red'
        })
      })
  }

  const deletePerson = (id) => {
    const person = personsAll.find(pers => pers.id === id)
    if(window.confirm(`Do you really want to delete ${person.name}?`)){
      personsService
        .deletePerson(id)
        .then( resp => {
          setPersonsAll(personsAll.filter(pers => pers.id !== id))
          setInfoMsg2Sec({
            msg: `"${person.name}" deleted!`,
            color: 'green'
          })
        })
        .catch( error => {
          console.error('Error: ', error)
          setInfoMsg2Sec({
            msg: `There was an error deleting ${person.name}`,
            color: 'red'
          })
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
        setInfoMsg2Sec({
          msg: `"${newNumber}" is the current number for "${newName}". Pick another :)`,
          color: 'darkgoldenrod'
        })
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
      <Notification msgData={infoMsgData}/>
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

export default App;