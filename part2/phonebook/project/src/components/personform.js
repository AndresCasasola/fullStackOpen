const PersonForm = (props) => {
  const { newName,
          handleNameChange,
          newNumber,
          handleNumberChange,
          handleSubmit } = props

  return(
    <form>
      <h2 style={{ textIndent: "10px" }}>Add a new</h2>
      <div style={{ textIndent: "20px" }}>Name:   <input value={newName} onChange={handleNameChange}/></div>
      <div style={{ textIndent: "20px" }}>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <br></br>
      <div style={{ textIndent: "20px" }}><button type="submit" onClick={handleSubmit}>Send</button></div>
    </form>
    )
}

export default PersonForm