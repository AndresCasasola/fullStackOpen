const PersonsView = ({persons, fetchPersonsFromServer, deletePerson}) => {
  return(
    <div>
      <h2 style={{ textIndent: "10px" }}>Numbers</h2>
      <table style={{ textIndent: "20px" }}>
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td><b>Number</b></td>
            <td><b>Options</b> <button onClick={fetchPersonsFromServer}>update</button></td>
          </tr>
          {persons.map(pers => {
            return(
              <tr key={pers.id}>
                <td> {pers.name} </td> 
                <td> {pers.number} </td> 
                <td><button onClick={() => deletePerson(pers.id)}>delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default PersonsView