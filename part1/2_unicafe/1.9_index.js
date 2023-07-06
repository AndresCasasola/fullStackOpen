import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandle}) => {
  return(
    <button onClick={clickHandle}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad, all, avg, pos}) => {
  if(all === 0){
    return(<p>No statistics given</p>)
  }else{
    return(
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {all}</p>
        <p>Average: {avg}</p>
        <p>Positive: {pos}</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodHandler = () => setGood(good+1)
  const NeutralHandler = () => setNeutral(neutral+1)
  const BadHandler = () => setBad(bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={'Good'} clickHandle={GoodHandler}/>
      <Button text={'Neutral'} clickHandle={NeutralHandler}/>
      <Button text={'Bad'} clickHandle={BadHandler}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} avg={good-bad} pos={(100*good)/(good+neutral+bad)}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)