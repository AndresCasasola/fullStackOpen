const Filter = ({filterName, handleFilterNameChange}) => 
{
  return(
    <div>
        <p>Filter with</p>
        <input value={filterName} onChange={handleFilterNameChange}/>
    </div>
    )
}

export default Filter