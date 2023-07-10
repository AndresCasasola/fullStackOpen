const PersonForm = (props) => 
{
  const { newName,
          handleNameChange,
          newNumber,
          handleNumberChange,
          handleSubmit } = props

  return(
    <form>
      <h2>Add a new</h2>
      <div>Name:   <input value={newName} onChange={handleNameChange}/></div>
      <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit" onClick={handleSubmit}>Add</button></div>
    </form>
    )
}

export default PersonForm