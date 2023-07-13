import Weather from './weather'

const Country = ({country}) => 
{
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages: </h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img alt={country.flags['alt']} src={country.flags['png']}/>
      <Weather country={country}/>
    </div>
  )
}

export default Country;