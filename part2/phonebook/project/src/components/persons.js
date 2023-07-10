const Persons = ({persons}) => 
{
  return(
    <div>
        <h2>Numbers</h2>
        <div>
            {persons.map(pers => <li key={pers.id}> {pers.name}: {pers.number}</li>)}
        </div>
    </div>
    )
}
export default Persons