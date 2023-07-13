import axios from 'axios'
import React, {useState, useEffect} from 'react'

const fakeApiResponse =
{
  "request": {
    "type": "City",
    "query": "New York, United States of America",
    "language": "en",
    "unit": "m"
  },
  "location": {
    "name": "New York",
    "country": "United States of America",
    "region": "New York",
    "lat": "40.714",
    "lon": "-74.006",
    "timezone_id": "America/New_York",
    "localtime": "2019-09-07 08:14",
    "localtime_epoch": 1567844040,
    "utc_offset": "-4.0"
  },
  "current": {
    "observation_time": "12:14 PM",
    "temperature": 13,
    "weather_code": 113,
    "weather_icons": [
      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
    ],
    "weather_descriptions": [
      "Sunny"
    ],
    "wind_speed": 0,
    "wind_degree": 349,
    "wind_dir": "N",
    "pressure": 1010,
    "precip": 0,
    "humidity": 90,
    "cloudcover": 0,
    "feelslike": 13,
    "uv_index": 4,
    "visibility": 16
  }
}

const Weather = ({country}) => 
{
  const [apiResponse, setApiResponse] = useState({})
  
  //const countryName = country.name.common   //  Set fake country name due to API calls limitations
  const fakeCountryName = 'New York'

  useEffect (() => 
  {
    const queryParams =
    {
      server: 'http://api.weatherstack.com/',
      endpoint: 'current',
      api_key: '?access_key=' + process.env.REACT_APP_WEATHER_STACK_API_KEY,
      query: '&query=' + fakeCountryName
    }

      const queryUrl = Object.values(queryParams).join('')
      console.log(queryUrl)
    
      axios.get(queryUrl)
      .then(response => 
      {
        if(!response.data.error)
        {
          console.log('API request success!')
          //setApiResponse(response.data)   //  Get fake response instead of real api response due to 
                                            //  API calls limitations plan from WeatherStack.com
          setApiResponse(fakeApiResponse)
          console.log(response.data)
        }
        else
        {
          console.log('API request failed with error code: ', response.data.error.code)
        }
            
      }).catch(error => 
      {
        console.error("An error occurred: ", error);
      })
    }, [])

    return(
        <div>
            <h3>Weather data:</h3>
            <p>Temperature: {fakeApiResponse['current']['temperature']}ºC</p>
            <img alt='Weather icon' src={fakeApiResponse['current']['weather_icons'][0]} ></img>
            <p>Wind: {fakeApiResponse['current']['wind_speed']} m/s</p>
        </div>
    )
}

export default Weather;