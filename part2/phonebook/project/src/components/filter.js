const Filter = ({filterName, handleFilterNameChange}) => {
  return(
    <div>
        <p style={{ textIndent: "20px" }}>Filter with</p>
        <div style={{ textIndent: "20px" }}>
          <input value={filterName} onChange={handleFilterNameChange}/>
        </div>
    </div>
    )
}

export default Filter