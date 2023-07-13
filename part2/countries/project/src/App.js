import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/country'
import Weather from './components/weather'

function App() 
{
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

const hdleQueryChange = (event) =>
{
  const value = event.target.value
  setQuery(value)
  //setCountriesToShow(countries.filter(cntry => cntry.name.common.toLowerCase() === value.toLowerCase()))
  setCountriesToShow(countries.filter(cntry => cntry.name.common.toLowerCase().includes(value.toLowerCase()) ))
}

useEffect (() => 
{
  axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))
}, [])

  return (
    <div>
      <h2>Country search</h2>
      <form>
        <div>Find countries: <input value={query} onChange={hdleQueryChange}/> </div>
      </form>

        {(countriesToShow.length === 1) ? ( <Country country={countriesToShow[0]}/> 
          ) : (
          (countriesToShow.length > 1 && countriesToShow.length < 10) ? (  
            countriesToShow.map(function (country) {
              return(
                <li key={country.name.common}>
                  {country.name.common}
                  <button onClick={() => setCountriesToShow([country])}> show </button>
                </li>
              )
            })
          ) : (
            <p> Too many coincidences... </p>
          )
        )}
    </div>
  )
}

export default App;
