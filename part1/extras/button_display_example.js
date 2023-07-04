import React from 'react'
import {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
/*
const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
*/

const Display = ({counter}) => <p>{counter}</p>
/*
const Display = (props) => {
  return(
    <p> {props.counter} </p>
  )
}
*/

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter+1)
  const decreaseByOne = () => setCounter(counter-1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button text='Plus' handleClick={increaseByOne}/>
      <Button text='Minus'handleClick={decreaseByOne}/>
      <Button text='Zero' handleClick={setToZero}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))